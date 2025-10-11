<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import NewButton from '../../../../../../components/customer/NewButton.vue';
import Cookies from 'js-cookie'
import initAPI from '../../../../../../api/api';
import CustomModal from '../../../../../../components/customer/CustomModal.vue';

const token = Cookies.get('token')
const userData = JSON.parse(localStorage.getItem('userData'))

const questions = ref<any[]>([]);
const loading = ref(true);
const error = ref(null);

const currentQuestionIndex = ref(0);
const answers = ref<{ [key: number]: { value: number, modal: any } | null }>({});
const showModal = ref(false);
const currentModal = ref({ title: '', description: '' });
const transitionDirection = ref('next');
const isAnimating = ref(false);
const modalAnimating = ref(false);
const router = useRouter()
const hasTestResult = ref(false);
const isSubmitting = ref(false);
const showSuccessModal = ref(false);
const showInfoPopupp = ref(false);

const testHistory = ref<any[]>([]);
const canTakeTest = ref(true);
const daysUntilNextTest = ref(0);
const testEligibilityChecked = ref(false);

const STORAGE_KEY = 'map_test_progress';
const ANSWERS_KEY = 'map_test_answers';

const showInfoPopup = () => {
    showInfoPopupp.value = true;
};

const closeInfoPopup = () => {
    showInfoPopupp.value = false;
};

const checkTestEligibility = (history: any[]) => {
    if (history.length === 0) {
        canTakeTest.value = true;
        daysUntilNextTest.value = 0;
        return;
    }

    if (history.length >= 3) {
        canTakeTest.value = false;
        daysUntilNextTest.value = 0;
        return;
    }

    const latestTest = history[0];
    const lastTestDate = new Date(latestTest.created_at);
    const oneMonthLater = new Date(lastTestDate);
    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

    const today = new Date();

    if (today < oneMonthLater) {
        canTakeTest.value = false;
        const diffTime = oneMonthLater.getTime() - today.getTime();
        daysUntilNextTest.value = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    } else {
        canTakeTest.value = true;
        daysUntilNextTest.value = 0;
    }
};

const checkTestResult = async () => {
    try {
        const token = Cookies.get('token')
        const userData = JSON.parse(localStorage.getItem('userData') || '{}')

        if (!token || !userData.id) {
            router.push('/login')
            return false;
        }

        const response = await initAPI(
            'GET',
            `customers/map`,
            null,
            token
        );

        if (response.data && response.data.data && response.data.data.length > 0) {
            hasTestResult.value = true;
            testHistory.value = response.data.data;

            testHistory.value.sort((a, b) =>
                new Date(b.map.created_at).getTime() - new Date(a.map.created_at).getTime()
            );

            checkTestEligibility(testHistory.value);
        } else {
            hasTestResult.value = false;
            testHistory.value = [];
            canTakeTest.value = true;
        }
    } catch (error) {
        hasTestResult.value = false;
        testHistory.value = [];
        canTakeTest.value = true;
    } finally {
        testEligibilityChecked.value = true;
    }
}

const fetchQuestions = async () => {
    try {
        loading.value = true;

        if (!testEligibilityChecked.value) {
            await checkTestResult();
        }

        if (!canTakeTest.value) {
            loading.value = false;
            return;
        }

        const response = await initAPI('GET', 'map/questions', null, token);

        if (response.data && response.data.data) {
            questions.value = response.data.data;
            loadProgress();
        }
    } catch (err) {
        error.value = err;
    } finally {
        loading.value = false;
    }
};

const navigateToMAP = () => {
    router.push('/tangguh/map');
};

const loadProgress = () => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    const savedAnswers = localStorage.getItem(ANSWERS_KEY);

    if (savedProgress) {
        currentQuestionIndex.value = parseInt(savedProgress);
    }

    if (savedAnswers) {
        answers.value = JSON.parse(savedAnswers);
    }
};

const saveProgress = () => {
    localStorage.setItem(STORAGE_KEY, currentQuestionIndex.value.toString());
    localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers.value));
};

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);
const totalQuestions = computed(() => questions.value.length);
const currentQuestionGroup = computed(() => {
    if (!currentQuestion.value) return { questions: [], currentIndex: 0, total: 0 };

    const groupQuestions = questions.value.filter(q => q.type === currentQuestion.value.type);
    const currentIndex = groupQuestions.findIndex(q => q.id === currentQuestion.value.id);

    return {
        questions: groupQuestions,
        currentIndex: currentIndex + 1,
        total: groupQuestions.length
    };
});
const progress = computed(() => totalQuestions.value > 0 ? ((currentQuestionIndex.value + 1) / totalQuestions.value) * 100 : 0);
const isNextDisabled = computed(() => !currentQuestion.value || answers.value[currentQuestion.value.id] === undefined || answers.value[currentQuestion.value.id] === null);
const isPrevDisabled = computed(() => currentQuestionIndex.value === 0);

const selectOption = (option: any) => {
    if (!currentQuestion.value || !canTakeTest.value) return;

    answers.value[currentQuestion.value.id] = {
        value: option.value,
        modal: {
            title: option.text,
            description: option.text
        }
    };

    saveProgress();

    if (showModal.value && currentModal.value.title !== option.text) {
        modalAnimating.value = true;
        setTimeout(() => {
            currentModal.value = {
                title: option.text,
                description: option.text
            };
            modalAnimating.value = false;
        }, 150);
    } else {
        currentModal.value = {
            title: option.text,
            description: option.text
        };
        showModal.value = true;
    }
};

const formatAnswersForAPI = () => {
    const intrinsik: number[] = [];
    const ekstrinsik: number[] = [];

    questions.value.forEach(question => {
        const answer = answers.value[question.id];
        const value = answer ? answer.value : 1;

        switch (question.type) {
            case 'Intrinsik':
                intrinsik.push(value);
                break;
            case 'Ekstrinsik':
                ekstrinsik.push(value);
                break;
        }
    });

    return {
        customer_id: userData?.id || 0,
        intrinsik: intrinsik,
        ekstrinsik: ekstrinsik
    };
};

const handleSuccessModalConfirm = () => {
    showSuccessModal.value = false;
    router.push(`/tangguh/map/hasil`);
};

const submitAnswers = async () => {
    try {
        if (!canTakeTest.value) {
            alert('Anda tidak dapat melakukan tes saat ini. Silakan cek status tes Anda.');
            return;
        }

        isSubmitting.value = true;
        const payload = formatAnswersForAPI();
        const response = await initAPI('POST', 'customers/map', payload, token);

        if (response.data && response.data.message === 'Jawaban Berhasil Direkam.') {
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem(ANSWERS_KEY);
            showSuccessModal.value = true;
            localStorage.setItem('map_id', response?.data.data.id)
        }
    } catch (err) {
        console.error('Error submitting answers:', err);
    } finally {
        isSubmitting.value = false;
    }
};

const nextQuestion = () => {
    if (isNextDisabled.value || isSubmitting.value || !canTakeTest.value) return;

    if (currentQuestionIndex.value < totalQuestions.value - 1) {
        transitionDirection.value = 'next';
        isAnimating.value = true;
        setTimeout(() => {
            currentQuestionIndex.value++;
            isAnimating.value = false;
            saveProgress();
        }, 300);
    } else {
        submitAnswers();
    }
};

const prevQuestion = () => {
    if (!isPrevDisabled.value && canTakeTest.value) {
        transitionDirection.value = 'prev';
        isAnimating.value = true;
        setTimeout(() => {
            currentQuestionIndex.value--;
            isAnimating.value = false;
            saveProgress();
        }, 300);
    }
};

const getIcon = (value: number) => {
    const icons = {
        1: 'empty',
        2: 'quarter',
        3: 'half',
        4: 'three-quarters',
        5: 'full'
    };

    const iconType = icons[value as keyof typeof icons] || 'empty';

    const iconSVGs = {
        empty: `
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
  <g clip-path="url(#clip0_4362_18751)">
    <mask id="mask0_4362_18751" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
      <path d="M24.5 0H0.5V24H24.5V0Z" fill="white"/>
    </mask>
    <g mask="url(#mask0_4362_18751)">
      <path d="M16.7794 22.1005H12.9794C12.4194 22.1005 11.1994 21.9305 10.5494 21.2805L7.51938 18.9405L8.43938 17.7505L11.5394 20.1505C11.7894 20.3905 12.4194 20.5905 12.9794 20.5905H16.7794C17.6794 20.5905 18.6494 19.8705 18.8494 19.0605L21.2694 11.7105C21.4294 11.2705 21.3994 10.8705 21.1894 10.5805C20.9694 10.2705 20.5694 10.0905 20.0794 10.0905H16.0794C15.5594 10.0905 15.0794 9.87048 14.7494 9.49048C14.4094 9.10048 14.2594 8.58048 14.3394 8.04048L14.8394 4.83048C14.9594 4.27048 14.5794 3.64048 14.0394 3.46048C13.5494 3.28048 12.9194 3.54048 12.6994 3.86048L8.59938 9.96048L7.35938 9.13048L11.4594 3.03048C12.0894 2.09048 13.4694 1.64048 14.5494 2.05048C15.7994 2.46048 16.5994 3.84048 16.3194 5.12048L15.8294 8.27048C15.8194 8.34048 15.8194 8.44048 15.8894 8.52048C15.9394 8.57048 16.0094 8.60048 16.0894 8.60048H20.0894C21.0694 8.60048 21.9194 9.01048 22.4194 9.72048C22.9094 10.4105 23.0094 11.3205 22.6894 12.2005L20.2994 19.4805C19.9294 20.9305 18.3894 22.1005 16.7794 22.1005Z" fill="#6464FA"/>
      <path d="M5.87891 21.0004H4.87891C3.02891 21.0004 2.12891 20.1304 2.12891 18.3504V8.55039C2.12891 6.77039 3.02891 5.90039 4.87891 5.90039H5.87891C7.72891 5.90039 8.62891 6.77039 8.62891 8.55039V18.3504C8.62891 20.1304 7.72891 21.0004 5.87891 21.0004ZM4.87891 7.40039C3.78891 7.40039 3.62891 7.66039 3.62891 8.55039V18.3504C3.62891 19.2404 3.78891 19.5004 4.87891 19.5004H5.87891C6.96891 19.5004 7.12891 19.2404 7.12891 18.3504V8.55039C7.12891 7.66039 6.96891 7.40039 5.87891 7.40039H4.87891Z" fill="#6464FA"/>
    </g>
  </g>
  <defs>
    <clipPath id="clip0_4362_18751">
      <rect width="24" height="24" fill="white" transform="translate(0.5)"/>
    </clipPath>
  </defs>
</svg>
    `,
        quarter: `
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
  <g clip-path="url(#clip0_4362_18759)">
    <mask id="mask0_4362_18759" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
      <path d="M24.5 0H0.5V24H24.5V0Z" fill="white"/>
    </mask>
    <g mask="url(#mask0_4362_18759)">
      <path d="M16.7794 22.1005H12.9794C12.4194 22.1005 11.1994 21.9305 10.5494 21.2805L7.51938 18.9405L8.43938 17.7505L11.5394 20.1505C11.7894 20.3905 12.4194 20.5905 12.9794 20.5905H16.7794C17.6794 20.5905 18.6494 19.8705 18.8494 19.0605L21.2694 11.7105C21.4294 11.2705 21.3994 10.8705 21.1894 10.5805C20.9694 10.2705 20.5694 10.0905 20.0794 10.0905H16.0794C15.5594 10.0905 15.0794 9.87048 14.7494 9.49048C14.4094 9.10048 14.2594 8.58048 14.3394 8.04048L14.8394 4.83048C14.9594 4.27048 14.5794 3.64048 14.0394 3.46048C13.5494 3.28048 12.9194 3.54048 12.6994 3.86048L8.59938 9.96048L7.35938 9.13048L11.4594 3.03048C12.0894 2.09048 13.4694 1.64048 14.5494 2.05048C15.7994 2.46048 16.5994 3.84048 16.3194 5.12048L15.8294 8.27048C15.8194 8.34048 15.8194 8.44048 15.8894 8.52048C15.9394 8.57048 16.0094 8.60048 16.0894 8.60048H20.0894C21.0694 8.60048 21.9194 9.01048 22.4194 9.72048C22.9094 10.4105 23.0094 11.3205 22.6894 12.2005L20.2994 19.4805C19.9294 20.9305 18.3894 22.1005 16.7794 22.1005Z" fill="#6464FA"/>
      <path d="M5.87891 21.0004H4.87891C3.02891 21.0004 2.12891 20.1304 2.12891 18.3504V8.55039C2.12891 6.77039 3.02891 5.90039 4.87891 5.90039H5.87891C7.72891 5.90039 8.62891 6.77039 8.62891 8.55039V18.3504C8.62891 20.1304 7.72891 21.0004 5.87891 21.0004ZM4.87891 7.40039C3.78891 7.40039 3.62891 7.66039 3.62891 8.55039V18.3504C3.62891 19.2404 3.78891 19.5004 4.87891 19.5004H5.87891C6.96891 19.5004 7.12891 19.2404 7.12891 18.3504V8.55039C7.12891 7.66039 6.96891 7.40039 5.87891 7.40039H4.87891Z" fill="#6464FA"/>
    </g>
    <path d="M7.99949 7.99902C0.5 3.99936 3.97 12.9498 3 13.9998H12.5014L12.4995 3.99936C11.2395 3.68936 9.66949 7.99902 7.99949 7.99902Z" fill="#6464FA"/>
  </g>
  <defs>
    <clipPath id="clip0_4362_18759">
      <rect width="24" height="24" fill="white" transform="translate(0.5)"/>
    </clipPath>
  </defs>
</svg>
    `,
        half: `
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
  <g clip-path="url(#clip0_4362_18768)">
    <mask id="mask0_4362_18768" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
      <path d="M24.5 0H0.5V24H24.5V0Z" fill="white"/>
    </mask>
    <g mask="url(#mask0_4362_18768)">
      <path d="M16.7794 22.1005H12.9794C12.4194 22.1005 11.1994 21.9305 10.5494 21.2805L7.51938 18.9405L8.43938 17.7505L11.5394 20.1505C11.7894 20.3905 12.4194 20.5905 12.9794 20.5905H16.7794C17.6794 20.5905 18.6494 19.8705 18.8494 19.0605L21.2694 11.7105C21.4294 11.2705 21.3994 10.8705 21.1894 10.5805C20.9694 10.2705 20.5694 10.0905 20.0794 10.0905H16.0794C15.5594 10.0905 15.0794 9.87048 14.7494 9.49048C14.4094 9.10048 14.2594 8.58048 14.3394 8.04048L14.8394 4.83048C14.9594 4.27048 14.5794 3.64048 14.0394 3.46048C13.5494 3.28048 12.9194 3.54048 12.6994 3.86048L8.59938 9.96048L7.35938 9.13048L11.4594 3.03048C12.0894 2.09048 13.4694 1.64048 14.5494 2.05048C15.7994 2.46048 16.5994 3.84048 16.3194 5.12048L15.8294 8.27048C15.8194 8.34048 15.8194 8.44048 15.8894 8.52048C15.9394 8.57048 16.0094 8.60048 16.0894 8.60048H20.0894C21.0694 8.60048 21.9194 9.01048 22.4194 9.72048C22.9094 10.4105 23.0094 11.3205 22.6894 12.2005L20.2994 19.4805C19.9294 20.9305 18.3894 22.1005 16.7794 22.1005Z" fill="#6464FA"/>
      <path d="M5.87891 21.0004H4.87891C3.02891 21.0004 2.12891 20.1304 2.12891 18.3504V8.55039C2.12891 6.77039 3.02891 5.90039 4.87891 5.90039H5.87891C7.72891 5.90039 8.62891 6.77039 8.62891 8.55039V18.3504C8.62891 20.1304 7.72891 21.0004 5.87891 21.0004ZM4.87891 7.40039C3.78891 7.40039 3.62891 7.66039 3.62891 8.55039V18.3504C3.62891 19.2404 3.78891 19.5004 4.87891 19.5004H5.87891C6.96891 19.5004 7.12891 19.2404 7.12891 18.3504V8.55039C7.12891 7.66039 6.96891 7.40039 5.87891 7.40039H4.87891Z" fill="#6464FA"/>
    </g>
    <path d="M7.99805 7.99902C0 2.49902 3.96869 18.449 2.99869 19.499L5.99869 19.999L7.99869 18.999L12.498 20.999V3.99936C11.238 3.68936 9.66805 7.99902 7.99805 7.99902Z" fill="#6464FA"/>
    <rect x="8" y="6" width="1" height="15" fill="white"/>
  </g>
  <defs>
    <clipPath id="clip0_4362_18768">
      <rect width="24" height="24" fill="white" transform="translate(0.5)"/>
    </clipPath>
  </defs>
</svg>
    `,
        'three-quarters': `
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
  <g clip-path="url(#clip0_4362_18778)">
    <mask id="mask0_4362_18778" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
      <path d="M24.5 0H0.5V24H24.5V0Z" fill="white"/>
    </mask>
    <g mask="url(#mask0_4362_18778)">
      <path d="M16.7794 22.1005H12.9794C12.4194 22.1005 11.1994 21.9305 10.5494 21.2805L7.51938 18.9405L8.43938 17.7505L11.5394 20.1505C11.7894 20.3905 12.4194 20.5905 12.9794 20.5905H16.7794C17.6794 20.5905 18.6494 19.8705 18.8494 19.0605L21.2694 11.7105C21.4294 11.2705 21.3994 10.8705 21.1894 10.5805C20.9694 10.2705 20.5694 10.0905 20.0794 10.0905H16.0794C15.5594 10.0905 15.0794 9.87048 14.7494 9.49048C14.4094 9.10048 14.2594 8.58048 14.3394 8.04048L14.8394 4.83048C14.9594 4.27048 14.5794 3.64048 14.0394 3.46048C13.5494 3.28048 12.9194 3.54048 12.6994 3.86048L8.59938 9.96048L7.35938 9.13048L11.4594 3.03048C12.0894 2.09048 13.4694 1.64048 14.5494 2.05048C15.7994 2.46048 16.5994 3.84048 16.3194 5.12048L15.8294 8.27048C15.8194 8.34048 15.8194 8.44048 15.8894 8.52048C15.9394 8.57048 16.0094 8.60048 16.0894 8.60048H20.0894C21.0694 8.60048 21.9194 9.01048 22.4194 9.72048C22.9094 10.4105 23.0094 11.3205 22.6894 12.2005L20.2994 19.4805C19.9294 20.9305 18.3894 22.1005 16.7794 22.1005Z" fill="#6464FA"/>
      <path d="M5.87891 21.0004H4.87891C3.02891 21.0004 2.12891 20.1304 2.12891 18.3504V8.55039C2.12891 6.77039 3.02891 5.90039 4.87891 5.90039H5.87891C7.72891 5.90039 8.62891 6.77039 8.62891 8.55039V18.3504C8.62891 20.1304 7.72891 21.0004 5.87891 21.0004ZM4.87891 7.40039C3.78891 7.40039 3.62891 7.66039 3.62891 8.55039V18.3504C3.62891 19.2404 3.78891 19.5004 4.87891 19.5004H5.87891C6.96891 19.5004 7.12891 19.2404 7.12891 18.3504V8.55039C7.12891 7.66039 6.96891 7.40039 5.87891 7.40039H4.87891Z" fill="#6464FA"/>
    </g>
    <path d="M7.99799 7.99902C-5.67436e-05 2.49902 3.96863 18.449 2.99863 19.499L5.99863 19.999L7.99863 18.999L13 20.999L18.5 20.499L21.5 13.999H12.498V3.99936C11.238 3.68936 9.66799 7.99902 7.99799 7.99902Z" fill="#6464FA"/>
    <rect x="7.75" y="6" width="1" height="15" fill="white"/>
  </g>
  <defs>
    <clipPath id="clip0_4362_18778">
      <rect width="24" height="24" fill="white" transform="translate(0.5)"/>
    </clipPath>
  </defs>
</svg>
    `,
        full: `
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
  <g clip-path="url(#clip0_4362_18788)">
    <mask id="mask0_4362_18788" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
      <path d="M24.5 0H0.5V24H24.5V0Z" fill="white"/>
    </mask>
    <g mask="url(#mask0_4362_18788)">
      <path d="M8.89062 18.4907V8.33071C8.89062 7.93071 9.01063 7.54071 9.23063 7.21071L11.9606 3.15071C12.3906 2.50071 13.4606 2.04071 14.3706 2.38071C15.3506 2.71071 16.0006 3.81071 15.7906 4.79071L15.2706 8.06071C15.2306 8.36071 15.3106 8.63071 15.4806 8.84071C15.6506 9.03071 15.9006 9.15071 16.1706 9.15071H20.2806C21.0706 9.15071 21.7506 9.47071 22.1506 10.0307C22.5306 10.5707 22.6006 11.2707 22.3506 11.9807L19.8906 19.4707C19.5806 20.7107 18.2306 21.7207 16.8906 21.7207H12.9906C12.3206 21.7207 11.3806 21.4907 10.9506 21.0607L9.67063 20.0707C9.18063 19.7007 8.89062 19.1107 8.89062 18.4907Z" fill="#6464FA"/>
      <path d="M5.71 6.38086H4.68C3.13 6.38086 2.5 6.98086 2.5 8.46086V18.5209C2.5 20.0009 3.13 20.6009 4.68 20.6009H5.71C7.26 20.6009 7.89 20.0009 7.89 18.5209V8.46086C7.89 6.98086 7.26 6.38086 5.71 6.38086Z" fill="#6464FA"/>
    </g>
  </g>
  <defs>
    <clipPath id="clip0_4362_18788">
      <rect width="24" height="24" fill="white" transform="translate(0.5)"/>
    </clipPath>
  </defs>
</svg>
    `
    };

    return iconSVGs[iconType as keyof typeof iconSVGs] || '';
};

onMounted(() => {
    checkTestResult();
    fetchQuestions();
});

onMounted(() => {
    if (questions.value.length === 0) {
        loadProgress();
    }
});

watch(currentQuestion, (newQuestion) => {
    if (newQuestion && answers.value[newQuestion.id]) {
        currentModal.value = answers.value[newQuestion.id].modal;
        showModal.value = true;
    } else {
        showModal.value = false;
    }
});
</script>

<template>
    <div class="w-full bg-[#F8FBFE] font-sora">
        <div class="h-screen p-4 space-y-6 md:max-w-[50%] lg:max-w-[30%] xl:max-w-[25%] mx-auto relative">
            <div v-if="testEligibilityChecked && !canTakeTest"
                class="h-screen flex flex-col justify-center items-center">
                <div class="text-center mb-8">
                    <h1 class="text-xl font-bold text-[#6464FA] mb-4">Akses Tes Dibatasi</h1>
                    <p class="text-sm text-gray-600">
                        <span v-if="testHistory.length >= 3">
                            Anda telah mencapai batas maksimal 3 tes.
                        </span>
                        <span v-else>
                            Anda dapat melakukan tes lagi dalam {{ daysUntilNextTest }} hari.
                        </span>
                    </p>
                </div>

                <div class="w-full md:max-w-lg">
                    <div class="mb-6 p-4 bg-white rounded-2xl shadow-sm">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-sm font-medium">Status Tes:</span>
                            <span :class="[
                                'text-xs font-semibold px-2 py-1 rounded-full',
                                testHistory.length >= 3 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                            ]">
                                {{ testHistory.length >= 3 ? 'Sudah 3 Tes' : `Tunggu ${daysUntilNextTest} hari` }}
                            </span>
                        </div>
                        <div class="text-xs text-gray-600">
                            <span v-if="testHistory.length < 3">
                                Sisa tes: {{ 3 - testHistory.length }} kali
                            </span>
                            <span v-else>
                                Sudah mencapai batas 3 tes
                            </span>
                        </div>
                    </div>

                    <NewButton @click="navigateToMAP" text="Kembali ke Halaman MAP" class="w-full font-semibold"
                        text-size="text-sm" />
                </div>
            </div>

            <div v-else-if="testEligibilityChecked && canTakeTest" class="w-full h-full">
                <div class="w-full text-center flex justify-center items-center gap-2 mb-6 md:mb-8">
                    <div class="py-1 px-3 rounded-md bg-primary/20">
                        <p class="text-sm">Tes</p>
                    </div>
                    <h1 class="text-sm font-bold">Tes Jatidiri Tangguh - MAP</h1>
                </div>

                <div v-if="loading" class="text-center py-10">
                    <p>Memuat pertanyaan...</p>
                </div>

                <div v-else-if="error" class="text-center py-10 text-red-500">
                    <p>Gagal memuat pertanyaan. Silakan refresh halaman.</p>
                </div>

                <div v-else class="w-full h-full relative">
                    <div class="w-full h-2 rounded-full bg-[#EFEFEF] mb-6 md:mb-8"></div>
                    <div class="absolute top-0 h-2 rounded-full bg-primary transition-all duration-500"
                        :style="{ width: `${progress}%` }"></div>

                    <div v-if="currentQuestion"
                        class="px-6 py-6 bg-white border border-black/20 rounded-3xl shadow-xl shadow-black/5 space-y-3 overflow-hidden relative"
                        :class="{
                            'animate-slide-in-next': transitionDirection === 'next' && isAnimating,
                            'animate-slide-in-prev': transitionDirection === 'prev' && isAnimating
                        }">
                        <div class="w-full flex justify-between items-start gap-4">
                            <div class="space-y-2">
                                <h6 class="text-[#9A9A9A] text-sm">Pertanyaan {{ currentQuestionIndex + 1 }}
                                    dari {{ totalQuestions }}</h6>
                            </div>
                            <div @click="showInfoPopup">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <path
                                        d="M13.125 16.875C13.125 17.0975 13.059 17.315 12.9354 17.5C12.8118 17.685 12.6361 17.8292 12.4305 17.9144C12.225 17.9995 11.9988 18.0218 11.7805 17.9784C11.5623 17.935 11.3618 17.8278 11.2045 17.6705C11.0472 17.5132 10.94 17.3127 10.8966 17.0945C10.8532 16.8762 10.8755 16.65 10.9606 16.4445C11.0458 16.2389 11.19 16.0632 11.375 15.9396C11.56 15.816 11.7775 15.75 12 15.75C12.2984 15.75 12.5845 15.8685 12.7955 16.0795C13.0065 16.2905 13.125 16.5766 13.125 16.875ZM12 6.75C9.93188 6.75 8.25 8.26406 8.25 10.125V10.5C8.25 10.6989 8.32902 10.8897 8.46967 11.0303C8.61033 11.171 8.80109 11.25 9 11.25C9.19892 11.25 9.38968 11.171 9.53033 11.0303C9.67099 10.8897 9.75 10.6989 9.75 10.5V10.125C9.75 9.09375 10.7597 8.25 12 8.25C13.2403 8.25 14.25 9.09375 14.25 10.125C14.25 11.1562 13.2403 12 12 12C11.8011 12 11.6103 12.079 11.4697 12.2197C11.329 12.3603 11.25 12.5511 11.25 12.75V13.5C11.25 13.6989 11.329 13.8897 11.4697 14.0303C11.6103 14.171 11.8011 14.25 12 14.25C12.1989 14.25 12.3897 14.171 12.5303 14.0303C12.671 13.8897 12.75 13.6989 12.75 13.5V13.4325C14.46 13.1184 15.75 11.7544 15.75 10.125C15.75 8.26406 14.0681 6.75 12 6.75ZM21.75 12C21.75 13.9284 21.1782 15.8134 20.1068 17.4168C19.0355 19.0202 17.5127 20.2699 15.7312 21.0078C13.9496 21.7458 11.9892 21.9389 10.0979 21.5627C8.20656 21.1865 6.46928 20.2579 5.10571 18.8943C3.74215 17.5307 2.81355 15.7934 2.43735 13.9021C2.06114 12.0108 2.25422 10.0504 2.99218 8.26884C3.73013 6.48726 4.97982 4.96451 6.58319 3.89317C8.18657 2.82183 10.0716 2.25 12 2.25C14.585 2.25273 17.0634 3.28084 18.8913 5.10872C20.7192 6.93661 21.7473 9.41498 21.75 12ZM20.25 12C20.25 10.3683 19.7661 8.77325 18.8596 7.41655C17.9531 6.05984 16.6646 5.00242 15.1571 4.37799C13.6497 3.75357 11.9909 3.59019 10.3905 3.90852C8.79017 4.22685 7.32016 5.01259 6.16637 6.16637C5.01259 7.32015 4.22685 8.79016 3.90853 10.3905C3.5902 11.9908 3.75358 13.6496 4.378 15.1571C5.00242 16.6646 6.05984 17.9531 7.41655 18.8596C8.77326 19.7661 10.3683 20.25 12 20.25C14.1873 20.2475 16.2843 19.3775 17.8309 17.8309C19.3775 16.2843 20.2475 14.1873 20.25 12Z"
                                        fill="#FB3748" />
                                </svg>
                            </div>
                        </div>
                        <h2 class="text-[#3A225D] text-xl font-bold">{{ currentQuestion.question }}</h2>
                    </div>

                    <div v-if="currentQuestion" class="absolute bottom-4 left-4 right-4 space-y-8">
                        <div v-if="showModal"
                            class="p-4 rounded-xl w-full bg-[#EDEFFE] relative transition-all duration-300" :class="{
                                'animate-modal-show': showModal && !modalAnimating,
                                'animate-modal-change': modalAnimating
                            }">
                            <div class="space-y-2">
                                <h6 class="text-xs font-semibold">{{ currentModal.title }}</h6>
                            </div>
                        </div>

                        <div class="grid grid-cols-5 gap-7">
                            <div v-for="(option, index) in currentQuestion.answers" :key="index"
                                @click="selectOption(option)"
                                class="w-12 h-12 rounded-full border flex justify-center items-center p-3 cursor-pointer group transition-all duration-500"
                                :class="{
                                    'border-[#EAEAEA] bg-white': answers[currentQuestion.id]?.value !== option.value,
                                    'border-primary bg-primary': answers[currentQuestion.id]?.value === option.value
                                }">
                                <div v-html="getIcon(option.value)"
                                    :class="{ '': answers[currentQuestion.id]?.value !== option.value, 'brightness-0 invert': answers[currentQuestion.id]?.value === option.value }">
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center gap-4">
                            <button @click="prevQuestion" :disabled="isPrevDisabled" class="rounded-full flex justify-center items-center relative z-10 border-4 border-[#8383FB]
          shadow-[inset_0_-4px_6px_-1px_rgba(0,0,0,0.2),inset_0_4px_6px_-1px_rgba(255,255,255,0.5)]
          transition-all duration-500" :class="{
            'bg-primary w-12 h-12 animate-button-appear': !isPrevDisabled,
            'w-0 h-0 opacity-0 border-0 shadow-none': isPrevDisabled
        }" :style="isPrevDisabled ? 'margin-right: -1.5rem' : ''">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"
                                    fill="none"
                                    :class="{ 'opacity-0': isPrevDisabled, 'opacity-100': !isPrevDisabled }">
                                    <path
                                        d="M19.9991 27.56C19.7457 27.56 19.4924 27.4667 19.2924 27.2667L10.5991 18.5734C9.18573 17.16 9.18573 14.84 10.5991 13.4267L19.2924 4.73336C19.6791 4.34669 20.3191 4.34669 20.7057 4.73336C21.0924 5.12003 21.0924 5.76003 20.7057 6.14669L12.0124 14.84C11.3724 15.48 11.3724 16.52 12.0124 17.16L20.7057 25.8534C21.0924 26.24 21.0924 26.88 20.7057 27.2667C20.5057 27.4534 20.2524 27.56 19.9991 27.56Z"
                                        :fill="isPrevDisabled ? '#9A9A9A' : 'white'" />
                                </svg>
                            </button>
                            <div class="relative flex-1">
                                <NewButton @click="nextQuestion"
                                    :text="currentQuestionIndex === totalQuestions - 1 ? 'Selesai' : 'Selanjutnya'"
                                    class="font-semibold transition-all duration-500 w-full" text-size="text-sm"
                                    :bg-color="(isNextDisabled || isSubmitting) ? 'bg-gray-300' : 'bg-primary'"
                                    :text-color="(isNextDisabled || isSubmitting) ? 'text-white' : 'text-white'"
                                    :border-color="(isNextDisabled || isSubmitting) ? 'border-gray-400/10' : 'border-[#8383FB]'"
                                    :disabled="isNextDisabled || isSubmitting" />

                                <div v-if="isSubmitting" class="absolute inset-0 flex items-center justify-center">
                                    <div
                                        class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="min-h-screen flex flex-col justify-center items-center">
                <div class="text-center">
                    <p>Memeriksa status tes...</p>
                </div>
            </div>
        </div>

        <CustomModal :show="showSuccessModal" title="Test Selesai!"
            message="Terima kasih telah menyelesaikan tes jatidiri map. Anda akan diarahkan ke halaman hasil."
            confirm-text="Lihat Hasil" @confirm="handleSuccessModalConfirm" />

        <div v-if="showInfoPopupp"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6 space-y-4">
                <div @click="closeInfoPopup" class="text-red-500 w-fit ml-auto cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </div>
                <p class="text-sm text-justify">Pastikan jawaban yang kamu berikan mencerminkan prilaku kamu yang
                    sebenarnya dalam kehidupan sehari-hari, bukan seperti yang kamu inginkan atau harapkan.</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.animate-slide-in-next {
    animation: slideInNext 0.3s forwards;
}

.animate-slide-in-prev {
    animation: slideInPrev 0.3s forwards;
}

.animate-modal-show {
    animation: modalShow 0.3s ease-out forwards;
}

.animate-modal-change {
    animation: modalChange 0.3s ease-in-out forwards;
}

.animate-button-appear {
    animation: buttonAppear 0.5s ease-out forwards;
}

@keyframes slideInNext {
    from {
        transform: translateX(100%);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideInPrev {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes modalShow {
    0% {
        opacity: 0;
        transform: translateY(10px) scale(0.95);
    }

    100% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

@keyframes modalChange {
    0% {
        opacity: 1;
        transform: scale(1);
    }

    50% {
        opacity: 0;
        transform: scale(0.95);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes buttonAppear {
    0% {
        opacity: 0;
        transform: scale(0);
    }

    50% {
        opacity: 0.5;
        transform: scale(1.1);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}
</style>