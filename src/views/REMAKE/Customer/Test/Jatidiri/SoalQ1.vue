<template>
  <div v-if="loading" class="preloader-overlay">
    <span
      class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"
    ></span>
  </div>

  <div v-if="dataProfileInclomplete">
    <modalCekProfile />
  </div>

  <Layout v-if="!loading">
    <div
      class="mx-0 lg:mx-[40px] mb-3 h-5 p-7 justify-center items-center gap-2 inline-flex"
    >
      <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">
        Beranda
      </div>
      <div class="w-4 h-4 relative opacity-75">
        <img src="@/assets/img/chevron_forward.svg" />
      </div>
      <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">
        Lakukan Tes
      </div>
      <div class="w-4 h-4 relative opacity-75">
        <img src="@/assets/img/chevron_forward.svg" />
      </div>
      <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">
        Jatidiri
      </div>
      <div class="w-4 h-4 relative opacity-75">
        <img src="@/assets/img/chevron_forward.svg" />
      </div>
      <div
        class="opacity-75 text-black text-sm font-normal font-roboto leading-tight"
      >
        Q1
      </div>
    </div>

    <SelesaiTest
      v-if="isTested"
      routeUrl="user.views.hasil_jatidiri_q1"
      message="Test Jatidiri Q1 Selesai!"
      :subMessage="subMessage"
    />

    <section class="bg-white pb-[34px] mb-10" v-if="!isTested">
      <transition name="fade" mode="out-in">
        <div
          v-if="isKebijakanPrivasi"
          class="fixed z-[999] inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal"
        >
          <KebijakanPrivasi @toggleKebijakanPrivasi="toggleKebijakanPrivasi" />
        </div>
      </transition>

      <div class="flex flex-col justify-center items-center gap-[24px] mb-10">
        <div class="flex flex-col items-center gap-[56px]">
          <div
            class="mx-[30px] md:mx-[60px] h-auto flex-col justify-start items-start gap-4 inline-flex"
          >
            <span
              class="self-stretch text-center text-black text-xl md:text-3xl font-semibold font-['Sora'] leading-9"
              >Tes Jatidiri Q1</span
            >
            <span
              class="self-stretch text-center text-black text-sm md:text-base font-normal font-['Roboto'] leading-normal"
              >Pilihlah Pilih jawaban yang paling sesuai dengan kondisi anda
              saat ini dengan memilih jawaban pada salah satu pilihan
              berikut.</span
            >
            <div class="perposed">
                <ol class="list-decimal list-inside">
                <li>Sangat Tidak Sesuai</li>
                <li>Tidak Sesuai</li>
                <li>Netral</li>
                <li>Sesuai</li>
                <li>Sangat Sesuai</li>
                </ol>
            </div>
          </div>

          <!-- pertanyaan -->
          <div
            id="soal"
            v-if="dataPertanyaan"
            class="mx-[30px] md:mx-[60px] w-full h-auto p-9 bg-white rounded-3xl shadow flex flex-col gap-9"
          >
            <span
              class="self-stretch text-center text-black text-xl md:text-3xl font-semibold font-['Sora'] leading-9"
              >Pertanyaan</span
            >
            <div v-if="!loadingSubmit">
              <div
                v-for="(q, qIndex) in dataPertanyaan.data"
                class="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                <!-- Tampilkan nomor urut pertanyaan -->
                <label
                  class="block text-black text-sm md:text-base font-normal font-['Roboto'] leading-normal"
                >
                  {{ qIndex + 1 }}. {{ q.question }}
                </label>

                <!-- Daftar jawaban untuk setiap pertanyaan -->
                <div class="flex flex-col mx-2 mb-5">
                  <!-- Tombol pilihan jawaban -->
                  <div class="mt-2 flex items-center justify-center gap-4">
                    <button
                      @click="pilihJawaban(answer.value, qIndex)"
                      v-for="(answer, aIndex) in q.answers"
                      :key="aIndex"
                      :class="{
                        'bg-[#3030f8] border-[#3030f8] text-white':
                          isSelectedAnswer(qIndex, answer.value),
                        'border-[#667084] text-[#667084]': !isSelectedAnswer(
                          qIndex,
                          answer.value
                        ),
                      }"
                      class="group size-10 md:w-14 md:h-14 rounded-lg border transition-all hover:border-[#3030f8] flex-col justify-center items-center gap-2.5 inline-flex"
                    >
                      <div
                        :class="{
                          'text-white': isSelectedAnswer(qIndex, answer.value),
                          'group-hover:text-[#3030f8] text-[#667084]':
                            !isSelectedAnswer(qIndex, answer.value),
                        }"
                        class="text-[#667084] text-base md:text-2xl font-semibold font-['Roboto'] leading-loose uppercase"
                      >
                        {{ answer.value }}
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <div
                class="mt-10 gap-2 flex flex-col md:flex-row justify-center items-center"
              >
                <button
                  @click="handleNextQuestion"
                  class="hover:translate-x-1 hover:shadow-2xl transition-all h-11 pl-6 pr-4 py-1.5 bg-[#3030f8] rounded-full justify-center items-center gap-3 inline-flex"
                >
                  <div
                    class="text-white text-base font-normal font-['Roboto'] leading-normal justify-center"
                  >
                    Kirim Jawaban
                  </div>
                  <div class="w-6 h-6 relative">
                    <img
                      src="@/assets/icons/test_gim/chevron_right.svg"
                      alt="icon"
                    />
                  </div>
                </button>
              </div>
            </div>

            <div
              v-else
              class="w-[600px] h-[296px] flex flex-col justify-center items-center"
            >
              <span
                class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white py-[46px] mb-10">
      <ReservasiFooter />
    </section>
  </Layout>
</template>

<script setup>
import Layout from "@/Layout/Customer/Layout.vue";
import ReservasiFooter from "@/components/REMAKE/ReservasiFooter/Reservasi.vue";
import { onMounted, ref, defineEmits } from "vue";
import initAPI from "@/api/api";
import cekDataProfile from "@/components/cekProfile";
import modalCekProfile from "@/components/modalCekProfile/modalCekProfile.vue";
import Cookies from "js-cookie";
import SelesaiTest from "@/components/REMAKE/HasilTest/SelesaiTest/SelesaiTest.vue";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { useRouter } from "vue-router";

const emit = defineEmits(["refreshData"]); // Tambahkan ini

const subMessage = `Kerja yang bagus! Kamu telah menyelesaikan Tes <span class="font-bold">Jatidiri Q1</span>. Mari lihat hasilnya dan temukan lebih banyak tentang potensi diri Kamu!`;
const isTested = ref(null);

const dataProfileInclomplete = cekDataProfile();
const loading = ref(false);
const customerId = ref("");
const loadingSubmit = ref(false);
const loadingQuestion = ref(false);
const dataPertanyaan = ref(null);
const nextPages = ref("");
const jawabanPertanyaan = ref([]);

const arrCodeJawabanPertanyaan = ref([]);
//const isSubmit = ref(false)

const getUserData = async () => {
  try {
    const token = Cookies.get("token");
    const formData = new FormData();
    formData.append("refresh_user", "true");
    const userData = await initAPI("post", "login", formData, token);

    customerId.value = userData.data.customer.id;
    isTested.value =
      userData.data.customer.customers_q1 == null ? false : true;
    console.log(customerId.value);
    console.log(isTested.value);
  } catch (error) {
    // console.log(`error`, error)
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "User",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    loading.value = false;
  }
};

const scrollToSection = () => {
  setTimeout(() => {
    const soalElement = document.getElementById("soal");
    if (soalElement) {
      soalElement.scrollIntoView({ behavior: "smooth" }); // Scroll dengan animasi halus
    }
  }, 100);
};

const isSelectedAnswer = (qIndex, value) => {
  return arrCodeJawabanPertanyaan.value[qIndex] === value;
};

const pilihJawaban = (answerValue, qIndex) => {
  arrCodeJawabanPertanyaan.value[qIndex] = answerValue;
  // console.log('Updated answers:', arrCodeJawabanPertanyaan.value);
};

const checkAllQuestionsAnswered = () => {
  // Cek apakah ada jawaban yang masih null atau undefined di halaman saat ini
  return arrCodeJawabanPertanyaan.value.every(
    (answer) => answer !== null && answer !== undefined
  );
};

const handleNextQuestion = () => {
  // Cek apakah semua pertanyaan sudah dijawab
  const isAllAnswered = checkAllQuestionsAnswered();

  if (isAllAnswered) {
    Swal.fire({
      title: "Kirim jawaban sekarang?",
      text: "Jika belum yakin dengan jawabanmu klik tombol Cek Ulang dibawah.",
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "#3b3f5c",
      cancelButtonText: "Cek Ulang",
      confirmButtonColor: "#3030f8",
      confirmButtonText: "Ya, kirim",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const payload = {
            customer_id: customerId.value,
            answers: arrCodeJawabanPertanyaan.value,
          };

          const token = Cookies.get("token");
          const response = await initAPI(
            "post",
            "customers/q1",
            payload,
            token
          );

          Swal.fire({
            title: "Jawaban kamu sudah direkam",
            text: "Kamu bisa melihat hasil test kamu setelah ini.",
            icon: "success",
            confirmButtonColor: "#3030f8",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
              emit("refreshData");
            }
          });
        } catch (error) {
          // Tampilkan error jika pengiriman gagal
          console.error("Error submitting answers:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text:
              error.response?.message ||
              "Terjadi kesalahan saat mengirim jawaban.",
            showConfirmButton: false,
            timer: 2500,
          });
        }
      }
    });
  } else {
    Swal.fire({
      title: "Oopss Perhatikan jawabanmu",
      text: "Ada beberapa jawaban yang belum kamu isi",
      icon: "warning",
      showCancelButton: false,
      confirmButtonColor: "#3030f8",
      confirmButtonText: "Cek Ulang",
    });
  }
};

const getDataPertanyaan = async (page = 1) => {
  loadingQuestion.value = !loadingQuestion.value;
  const token = Cookies.get("token");
  if (token) {
    try {
      const response = await initAPI("get", `q1/questions`, null, token);

      const totalSoalSaatIni = response.data.data.length;
      const fromIndex = (page - 1) * totalSoalSaatIni; // Indeks global pertama di halaman ini

      // Inisialisasi jawaban jika belum ada
      for (let i = 0; i < totalSoalSaatIni; i++) {
        const globalIndex = fromIndex + i;
        if (arrCodeJawabanPertanyaan.value[globalIndex] === undefined) {
          arrCodeJawabanPertanyaan.value[globalIndex] = null; // Set jawaban awal ke null
        }
      }

      jawabanPertanyaan.value = response.data.data.map(() => []);
      dataPertanyaan.value = response.data;
      nextPages.value = response.data.next_page_url;

      scrollToSection();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Terjadi kesalahan saat mengambil data",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } else {
    router.push("/login");
    localStorage.clear();
  }
  loadingQuestion.value = !loadingQuestion.value;
};

onMounted(async () => {
  await getDataPertanyaan();
  await getUserData();
});
</script>
