<script setup>
import { onMounted, ref, computed, watch, onUnmounted } from 'vue'
import Satzerganzng from './components/Satzerganzng.vue'
import Wortausuahl from './components/Wortausuahl.vue'
import Analogien from './components/Analogien.vue'
import Gmeisamkeiten from './components/Gmeisamkeiten.vue'
import Zahlen from './components/Zahlen.vue'
import Ausuahl from './components/Ausuahl.vue'
import Aufgaben from './components/Aufgaben.vue'
import Wurfelaufgaben from './components/Wurfelaufgaben.vue'
import MerkAufgaben from './components/MerkAufgaben.vue'
import Cookies from 'js-cookie'
import initAPI from '../../../../../api/api'
import { useRouter } from 'vue-router'
import VectorDone from '../../../../../assets/icons/ist.png'
import NewButton from '../../../../../components/customer/NewButton.vue';
import Swal from 'sweetalert2'

const router = useRouter()

const answers = ref({
  satzerganzung: [],
  wortauswahl: [],
  analogien: [],
  gmeisamkeiten: '',
  aufgaben: [],
  zahlen: [],
  auswahl: [],
  wurfelaufgaben: [],
  merkaufgaben: []
})

const activeTestGroup = ref('satzerganzung')
const isLoading = ref(false)
const showSuccess = ref(false)
const showError = ref(false)
const hasTestResult = ref(false)
const testCompleted = ref(false)

const validateAge = () => {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}')
  
  if (!userData.birth_date) {
    router.push('/')
    return false
  }

  const birthDate = new Date(userData.birth_date.split('-').reverse().join('-'))
  const today = new Date()
  const age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  
  const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) 
    ? age - 1 
    : age

  if (actualAge < 16 || actualAge > 60) {
    Swal.fire({
      icon: 'warning',
      title: 'Peringatan',
      text: 'Umur anda tidak mencukupi untuk mengikuti tes IST',
      confirmButtonText: 'OK'
    })
    router.push('/')
    return false
  }
  
  return true
}

const enterFullscreen = () => {
  const element = document.documentElement
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  }
}

const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
}

const getFullscreenExitMessage = (attemptCount) => {
  const messages = {
    1: {
      title: 'Peringatan!',
      text: 'Anda keluar dari mode layar penuh. Untuk menjaga integritas tes, mohon tetap dalam mode layar penuh selama tes berlangsung.',
      icon: 'warning'
    },
    2: {
      title: 'Peringatan Kedua!',
      text: 'Ini adalah peringatan kedua. Keluar dari layar penuh dapat mempengaruhi validitas hasil tes Anda. Mohon tetap fokus pada tes.',
      icon: 'error'
    },
    3: {
      title: 'Peringatan Terakhir!',
      text: 'Anda telah keluar dari layar penuh sebanyak 3 kali atau lebih. Tindakan ini akan dicatat dan dapat mempengaruhi validitas hasil tes Anda.',
      icon: 'error'
    }
  }
  
  return attemptCount >= 3 ? messages[3] : messages[attemptCount]
}

const handleFullscreenChange = () => {
  const isFullscreen = !!(document.fullscreenElement || 
                         document.webkitFullscreenElement || 
                         document.msFullscreenElement)
  
  if (!isFullscreen && !testCompleted.value && !hasTestResult.value) {
    const exitAttempts = JSON.parse(localStorage.getItem('fullscreenExitAttempts') || '[]')
    exitAttempts.push({
      timestamp: new Date().toISOString(),
      page: 'ist-test',
      activeTest: activeTestGroup.value
    })
    localStorage.setItem('fullscreenExitAttempts', JSON.stringify(exitAttempts))
    
    const currentAttemptCount = exitAttempts.length
    const message = getFullscreenExitMessage(currentAttemptCount)
    
    Swal.fire({
      title: message.title,
      text: message.text,
      icon: message.icon,
      confirmButtonText: 'OK',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then(() => {
      setTimeout(() => {
        enterFullscreen()
      }, 100)
    })
  }
}

const checkTestResult = async () => {
  try {
    const token = Cookies.get('token')
    const userData = JSON.parse(localStorage.getItem('userData') || '{}')

    if (!token || !userData.id) {
      router.push('/login')
      return false;
    }

    const response = await initAPI('GET', `customers/ist?customer_id=${userData.id}`, null, token);

    if (response.data && response.data.data) {
      hasTestResult.value = true;
    }
  } catch (error) {
    hasTestResult.value = false;
  }
}

const convertLocalStorageData = (key, data) => {
  if (!data) return null;

  try {
    switch (key) {
      case 'SE':
      case 'WA':
      case 'AN':
      case 'FA':
      case 'WU':
        const parsed = JSON.parse(data);
        return Object.values(parsed).map(val => parseInt(val));

      case 'ME':
        const parsedME = JSON.parse(data);
        return Object.values(parsedME).map(val => {
          const numVal = parseInt(val);
          return isNaN(numVal) ? 0 : numVal;
        });

      case 'GE':
        return data;

      case 'RA':
      case 'ZR':
        const parsedObj = JSON.parse(data);
        return Object.values(parsedObj).map(item =>
          typeof item === 'object' ? parseInt(item.score) : parseInt(item)
        );

      default:
        return null;
    }
  } catch (error) {
    return null;
  }
}

const updateAnswersFromLocalStorage = () => {
  const localStorageData = {
    merkaufgaben: convertLocalStorageData('ME', localStorage.getItem('merkaufgabenAnswers')),
    satzerganzung: convertLocalStorageData('SE', localStorage.getItem('satzerganzungAnswers')),
    wortauswahl: convertLocalStorageData('WA', localStorage.getItem('wortauswahlAnswers')),
    analogien: convertLocalStorageData('AN', localStorage.getItem('analogienAnswers')),
    gmeisamkeiten: localStorage.getItem('gmeisamkeitenAnswers'),
    aufgaben: convertLocalStorageData('RA', localStorage.getItem('aufgabenAnswers')),
    zahlen: convertLocalStorageData('ZR', localStorage.getItem('zahlenAnswers')),
    auswahl: convertLocalStorageData('FA', localStorage.getItem('auswahlAnswers')),
    wurfelaufgaben: convertLocalStorageData('WU', localStorage.getItem('wurfelaufgabenAnswers')),
  };

  Object.keys(localStorageData).forEach(key => {
    if (localStorageData[key]) {
      answers.value[key] = localStorageData[key];
    }
  });

  localStorage.setItem('istAnswers', JSON.stringify(answers.value));
}

onMounted(() => {
  if (!validateAge()) return
  
  updateAnswersFromLocalStorage();

  const satzerganzungCompleted = localStorage.getItem('satzerganzungCompleted')
  if (satzerganzungCompleted === 'true') {
    activeTestGroup.value = 'wortauswahl'
  }

  const testOrder = [
    'satzerganzung', 'wortauswahl', 'analogien', 'gmeisamkeiten',
    'aufgaben', 'zahlen', 'auswahl', 'wurfelaufgaben', 'merkaufgaben'
  ]

  for (let i = 0; i < testOrder.length - 1; i++) {
    const currentTest = testOrder[i]
    const nextTest = testOrder[i + 1]
    const isCompleted = localStorage.getItem(`${currentTest}Completed`) === 'true'

    if (isCompleted && activeTestGroup.value === currentTest) {
      activeTestGroup.value = nextTest
    }
  }

  if (!hasTestResult.value) {
    setTimeout(() => {
      enterFullscreen()
    }, 500)
  }
  
  document.addEventListener('fullscreenchange', handleFullscreenChange)
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
  document.addEventListener('msfullscreenchange', handleFullscreenChange)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
  document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
  document.removeEventListener('msfullscreenchange', handleFullscreenChange)
})

watch(() => localStorage.getItem('merkaufgabenAnswers'), (newValue, oldValue) => {
  if (newValue !== oldValue) {
    updateAnswersFromLocalStorage();
  }
});

watch(activeTestGroup, (newGroup) => {
  if (newGroup === 'merkaufgaben') {
    updateAnswersFromLocalStorage();
  }
});

const handleAnswer = (questionType, answer) => {
  answers.value[questionType] = answer
  localStorage.setItem('istAnswers', JSON.stringify(answers.value))
}

const convertAllAnswersToAPIFormat = () => {
  const allAnswers = JSON.parse(localStorage.getItem('istAnswers') || '{}')
  const formatted = {}

  const fieldMapping = {
    'satzerganzung': 'se',
    'wortauswahl': 'wa',
    'analogien': 'an',
    'gmeisamkeiten': 'ge',
    'aufgaben': 'ra',
    'zahlen': 'zr',
    'auswahl': 'fa',
    'wurfelaufgaben': 'wu',
    'merkaufgaben': 'me'
  }

  Object.keys(allAnswers).forEach(key => {
    const apiFieldName = fieldMapping[key]

    if (apiFieldName === 'ge') {
      try {
        if (typeof allAnswers[key] === 'string') {
          const parsedGE = JSON.parse(allAnswers[key]);
          formatted[apiFieldName] = Object.values(parsedGE).filter(val => val !== '');
        } else {
          formatted[apiFieldName] = Object.values(allAnswers[key]).filter(val => val !== '');
        }
      } catch (e) {
        formatted[apiFieldName] = [];
      }
    } else if (['ra', 'zr'].includes(apiFieldName)) {
      formatted[apiFieldName] = Object.values(allAnswers[key]).map(item =>
        typeof item === 'object' ? parseInt(item.score) : parseInt(item)
      )
    } else {
      formatted[apiFieldName] = Object.values(allAnswers[key]).map(val => parseInt(val))
    }
  })

  return formatted
}

const sendISTDataToAPI = async (formattedData) => {
  try {
    const token = Cookies.get('token')
    const userData = JSON.parse(localStorage.getItem('userData'))

    const payload = {
      customer_id: userData.id,
      ...formattedData
    }

    const response = await initAPI('POST', 'customers/ist', payload, token)
    return response
  } catch (error) {
    throw error
  }
}

const clearISTLocalStorage = () => {
  const testTypes = [
    'satzerganzung', 'wortauswahl', 'analogien', 'gmeisamkeiten',
    'aufgaben', 'zahlen', 'auswahl', 'wurfelaufgaben', 'merkaufgaben'
  ]

  testTypes.forEach(type => {
    localStorage.removeItem(`${type}Completed`)
    localStorage.removeItem(`${type}Answers`)
    localStorage.removeItem(`${type}AnswersBefore`)
  })

  localStorage.removeItem('istAnswers')
}

const handleTestComplete = async (testType) => {
  localStorage.setItem(`${testType}Completed`, 'true')

  if (testType === 'merkaufgaben') {
    isLoading.value = true

    try {
      updateAnswersFromLocalStorage();

      const formattedAnswers = convertAllAnswersToAPIFormat()
      await sendISTDataToAPI(formattedAnswers)
      
      testCompleted.value = true
      showSuccess.value = true
      clearISTLocalStorage()
      
      exitFullscreen()
      
      setTimeout(() => {
        router.push('/ist/hasil')
      }, 2000)
    } catch (error) {
      showError.value = true
      console.error('Error sending data:', error)
    } finally {
      isLoading.value = false
    }
  } else {
    const testOrder = {
      'satzerganzung': 'wortauswahl',
      'wortauswahl': 'analogien',
      'analogien': 'gmeisamkeiten',
      'gmeisamkeiten': 'aufgaben',
      'aufgaben': 'zahlen',
      'zahlen': 'auswahl',
      'auswahl': 'wurfelaufgaben',
      'wurfelaufgaben': 'merkaufgaben'
    }

    if (testOrder[testType]) {
      activeTestGroup.value = testOrder[testType]
    }
  }
}

const navigateToResult = () => {
  router.push('/ist/hasil');
};

onMounted(() => {
  checkTestResult()
})
</script>

<template>
  <div class="w-full p-4 min-h-screen bg-[#F1F7FD] font-sora">
    <div class="w-full h-full md:max-w-[50%] lg:max-w-[35%] xl:max-w-[30%] mx-auto space-y-4 relative pb-20">

      <div v-if="hasTestResult" class="min-h-screen flex flex-col justify-center items-center">
        <div class="text-center mb-8">
          <h1 class="text-xl font-bold text-[#6464FA] mb-4">Tes Jatidiri Cerdas dewasa Telah Selesai!</h1>
          <p class="text-sm text-gray-600">Kamu telah menyelesaikan tes Jatidiri Cerdas dewasa. Sekarang kamu bisa
            melihat hasil dari tes Jatidiri Cerdas dewasa kamu.</p>
        </div>

        <div class="w-full max-w-xs p-6">
          <div class="mb-6">
            <img :src="VectorDone" alt="Jatidiri Cerdas dewasa Selesai">
          </div>

          <NewButton @click="navigateToResult" text="Lihat Hasil Tes" class="w-full font-semibold mb-4"
            text-size="text-sm" />

          <p class="text-xs text-center text-gray-500">
            Hasil tes akan memberikan wawasan tentang karir yang sesuai dengan kepribadianmu
          </p>
        </div>
      </div>

      <div class="space-y-4" v-else>
        <div class="flex justify-center items-center gap-4 animate-fadeIn">
          <div class="py-1 px-3 rounded-lg bg-[#DBE0FD] w-fit transform transition-all duration-300 hover:scale-105">
            <p class="text-sm md:text-base text-[#374151] font-medium">Tes</p>
          </div>
          <h1 class="text-base md:text-lg font-semibold text-black">Jatidiri Cerdas dewasa</h1>
        </div>

        <Satzerganzng v-if="activeTestGroup === 'satzerganzung'"
          @answer-selected="(answer) => handleAnswer('satzerganzung', answer)" :selected-answer="answers.satzerganzung"
          @test-complete="handleTestComplete('satzerganzung')" />

        <Wortausuahl v-if="activeTestGroup === 'wortauswahl'"
          @answer-selected="(answer) => handleAnswer('wortauswahl', answer)" :selected-answer="answers.wortauswahl"
          @test-complete="handleTestComplete('wortauswahl')" />

        <Analogien v-if="activeTestGroup === 'analogien'"
          @answer-selected="(answer) => handleAnswer('analogien', answer)" :selected-answer="answers.analogien"
          @test-complete="handleTestComplete('analogien')" />

        <Gmeisamkeiten v-if="activeTestGroup === 'gmeisamkeiten'"
          @answer-changed="(answer) => handleAnswer('gmeisamkeiten', answer)" :answer="answers.gmeisamkeiten"
          @test-complete="handleTestComplete('gmeisamkeiten')" />

        <Aufgaben v-if="activeTestGroup === 'aufgaben'" @answer-selected="(answer) => handleAnswer('aufgaben', answer)"
          :selected-answer="answers.aufgaben" @test-complete="handleTestComplete('aufgaben')" />

        <Zahlen v-if="activeTestGroup === 'zahlen'" @answer-selected="(answer) => handleAnswer('zahlen', answer)"
          :selected-answer="answers.zahlen" @test-complete="handleTestComplete('zahlen')" />

        <Ausuahl v-if="activeTestGroup === 'auswahl'" @answer-selected="(answer) => handleAnswer('auswahl', answer)"
          :selected-answer="answers.auswahl" @test-complete="handleTestComplete('auswahl')" />

        <Wurfelaufgaben v-if="activeTestGroup === 'wurfelaufgaben'"
          @answer-selected="(answer) => handleAnswer('wurfelaufgaben', answer)"
          :selected-answer="answers.wurfelaufgaben" @test-complete="handleTestComplete('wurfelaufgaben')" />

        <MerkAufgaben v-if="activeTestGroup === 'merkaufgaben'"
          @answer-selected="(answer) => handleAnswer('merkaufgaben', answer)" :selected-answer="answers.merkaufgaben"
          @test-complete="handleTestComplete('merkaufgaben')" />
      </div>
    </div>

    <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg flex flex-col items-center">
        <svg class="animate-spin h-8 w-8 text-primary mb-2" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path>
        </svg>
        <p class="text-sm">Mengirim jawaban...</p>
      </div>
    </div>

    <div v-if="showSuccess" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg flex flex-col items-center">
        <svg class="h-8 w-8 text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <p class="text-sm">Test berhasil diselesaikan!</p>
        <button @click="showSuccess = false" class="mt-4 px-4 py-2 bg-primary text-white rounded-lg">
          Tutup
        </button>
      </div>
    </div>

    <div v-if="showError" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg flex flex-col items-center">
        <svg class="h-8 w-8 text-red-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <p class="text-sm">Terjadi kesalahan saat mengirim data</p>
        <button @click="showError = false" class="mt-4 px-4 py-2 bg-primary text-white rounded-lg">
          Coba Lagi
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.primary {
  background-color: #6464FA;
}

.primary-light {
  background-color: #8080FF;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease-out;
}
</style>