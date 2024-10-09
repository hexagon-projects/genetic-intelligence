<template>
  <div v-if="loading" class="preloader-overlay">
    <span
      class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"
    ></span>
  </div>

  <Layout v-if="!loading">
    <section class="bg-[#F6F6F9] py-[66px] px-[20px] md:px-[60px]">
      <div class="flex flex-col gap-[36px]">
        <!-- Welcome -->
        <div class="flex flex-col gap-3">
          <h1
            class="text-[#0c141c] text-3xl md:text-4xl font-semibold font-['Roboto'] leading-10"
          >
            Welcome, Ms. Smith
          </h1>
          <span
            class="self-stretch text-[#4c7099] text-sm font-normal font-['Roboto'] leading-tight"
            >Here's a summary of student testing activity</span
          >
        </div>

        <!-- Card -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px]">
          <!-- Total Siswa -->
          <div
            class="h-28 p-6 bg-white rounded-xl border-l-4 border-[#5959f9] flex flex-col justify-start items-start gap-4"
          >
            <div class="flex justify-start items-center gap-4">
              <div class="w-[45px] h-[45px] relative">
                <svg
                  width="45"
                  height="46"
                  viewBox="0 0 45 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.0625 23.4125C24.063 22.5465 24.8654 21.4754 25.4154 20.2719C25.9654 19.0684 26.25 17.7607 26.25 16.4375C26.25 13.9511 25.2623 11.5665 23.5041 9.80837C21.746 8.05022 19.3614 7.0625 16.875 7.0625C14.3886 7.0625 12.004 8.05022 10.2459 9.80837C8.48772 11.5665 7.5 13.9511 7.5 16.4375C7.49999 17.7607 7.78463 19.0684 8.33461 20.2719C8.88459 21.4754 9.68704 22.5465 10.6875 23.4125C8.06276 24.601 5.83587 26.5204 4.27309 28.941C2.7103 31.3617 1.87776 34.1812 1.875 37.0625C1.875 37.5598 2.07254 38.0367 2.42417 38.3883C2.77581 38.74 3.25272 38.9375 3.75 38.9375C4.24728 38.9375 4.72419 38.74 5.07583 38.3883C5.42746 38.0367 5.625 37.5598 5.625 37.0625C5.625 34.0788 6.81026 31.2173 8.92005 29.1075C11.0298 26.9978 13.8913 25.8125 16.875 25.8125C19.8587 25.8125 22.7202 26.9978 24.83 29.1075C26.9397 31.2173 28.125 34.0788 28.125 37.0625C28.125 37.5598 28.3225 38.0367 28.6742 38.3883C29.0258 38.74 29.5027 38.9375 30 38.9375C30.4973 38.9375 30.9742 38.74 31.3258 38.3883C31.6775 38.0367 31.875 37.5598 31.875 37.0625C31.8722 34.1812 31.0397 31.3617 29.4769 28.941C27.9141 26.5204 25.6872 24.601 23.0625 23.4125ZM16.875 22.0625C15.7625 22.0625 14.6749 21.7326 13.7499 21.1145C12.8249 20.4964 12.1039 19.6179 11.6782 18.5901C11.2524 17.5623 11.141 16.4313 11.3581 15.3401C11.5751 14.249 12.1109 13.2467 12.8975 12.46C13.6842 11.6734 14.6865 11.1376 15.7776 10.9206C16.8688 10.7035 17.9998 10.8149 19.0276 11.2407C20.0554 11.6664 20.9339 12.3874 21.552 13.3124C22.1701 14.2374 22.5 15.325 22.5 16.4375C22.5 17.9293 21.9074 19.3601 20.8525 20.415C19.7976 21.4699 18.3668 22.0625 16.875 22.0625ZM35.1375 22.6625C36.3374 21.3112 37.1213 19.642 37.3946 17.8556C37.668 16.0693 37.4192 14.242 36.6783 12.5938C35.9374 10.9455 34.7359 9.54649 33.2184 8.56517C31.7009 7.58384 29.9321 7.06202 28.125 7.0625C27.6277 7.0625 27.1508 7.26004 26.7992 7.61168C26.4475 7.96331 26.25 8.44022 26.25 8.9375C26.25 9.43478 26.4475 9.91169 26.7992 10.2633C27.1508 10.615 27.6277 10.8125 28.125 10.8125C29.6168 10.8125 31.0476 11.4051 32.1025 12.46C33.1574 13.5149 33.75 14.9457 33.75 16.4375C33.7473 17.4223 33.4862 18.3892 32.9926 19.2414C32.4991 20.0936 31.7904 20.8013 30.9375 21.2938C30.6595 21.4541 30.4273 21.6831 30.2632 21.9589C30.099 22.2347 30.0084 22.5479 30 22.8688C29.9922 23.1871 30.0655 23.5021 30.2131 23.7842C30.3607 24.0663 30.5778 24.3062 30.8438 24.4813L31.575 24.9688L31.8187 25.1C34.0789 26.172 35.9856 27.8675 37.3143 29.9868C38.6431 32.1062 39.3385 34.5611 39.3187 37.0625C39.3187 37.5598 39.5163 38.0367 39.8679 38.3883C40.2196 38.74 40.6965 38.9375 41.1937 38.9375C41.691 38.9375 42.1679 38.74 42.5196 38.3883C42.8712 38.0367 43.0687 37.5598 43.0687 37.0625C43.0841 34.1852 42.3634 31.3517 40.9753 28.8314C39.5871 26.311 37.5775 24.1875 35.1375 22.6625Z"
                    fill="#5959F9"
                  />
                </svg>
              </div>
              <div class="flex-grow flex flex-col justify-start items-start gap-2">
                <div class="h-6">
                  <div
                    class="text-[#344053] text-base font-medium font-sora leading-normal"
                  >
                    Total Siswa
                  </div>
                </div>
                <div class="h-8">
                  <div
                    class="text-[#344053] text-2xl font-bold font-['Roboto'] leading-loose"
                  >
                    {{ dataStats.data_counts[0] }} Siswa
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Total Tes GIM -->
          <div
            class="h-28 p-6 bg-white rounded-xl border-l-4 border-[#31d583] flex justify-start items-center gap-4"
          >
            <div class="flex justify-start items-center gap-4">
              <div class="w-[45px] h-[45px] relative">
                <svg
                  width="45"
                  height="46"
                  viewBox="0 0 45 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.0625 23.4125C24.063 22.5465 24.8654 21.4754 25.4154 20.2719C25.9654 19.0684 26.25 17.7607 26.25 16.4375C26.25 13.9511 25.2623 11.5665 23.5041 9.80837C21.746 8.05022 19.3614 7.0625 16.875 7.0625C14.3886 7.0625 12.004 8.05022 10.2459 9.80837C8.48772 11.5665 7.5 13.9511 7.5 16.4375C7.49999 17.7607 7.78463 19.0684 8.33461 20.2719C8.88459 21.4754 9.68704 22.5465 10.6875 23.4125C8.06276 24.601 5.83587 26.5204 4.27309 28.941C2.7103 31.3617 1.87776 34.1812 1.875 37.0625C1.875 37.5598 2.07254 38.0367 2.42417 38.3883C2.77581 38.74 3.25272 38.9375 3.75 38.9375C4.24728 38.9375 4.72419 38.74 5.07583 38.3883C5.42746 38.0367 5.625 37.5598 5.625 37.0625C5.625 34.0788 6.81026 31.2173 8.92005 29.1075C11.0298 26.9978 13.8913 25.8125 16.875 25.8125C19.8587 25.8125 22.7202 26.9978 24.83 29.1075C26.9397 31.2173 28.125 34.0788 28.125 37.0625C28.125 37.5598 28.3225 38.0367 28.6742 38.3883C29.0258 38.74 29.5027 38.9375 30 38.9375C30.4973 38.9375 30.9742 38.74 31.3258 38.3883C31.6775 38.0367 31.875 37.5598 31.875 37.0625C31.8722 34.1812 31.0397 31.3617 29.4769 28.941C27.9141 26.5204 25.6872 24.601 23.0625 23.4125ZM16.875 22.0625C15.7625 22.0625 14.6749 21.7326 13.7499 21.1145C12.8249 20.4964 12.1039 19.6179 11.6782 18.5901C11.2524 17.5623 11.141 16.4313 11.3581 15.3401C11.5751 14.249 12.1109 13.2467 12.8975 12.46C13.6842 11.6734 14.6865 11.1376 15.7776 10.9206C16.8688 10.7035 17.9998 10.8149 19.0276 11.2407C20.0554 11.6664 20.9339 12.3874 21.552 13.3124C22.1701 14.2374 22.5 15.325 22.5 16.4375C22.5 17.9293 21.9074 19.3601 20.8525 20.415C19.7976 21.4699 18.3668 22.0625 16.875 22.0625ZM35.1375 22.6625C36.3374 21.3112 37.1213 19.642 37.3946 17.8556C37.668 16.0693 37.4192 14.242 36.6783 12.5938C35.9374 10.9455 34.7359 9.54649 33.2184 8.56517C31.7009 7.58384 29.9321 7.06202 28.125 7.0625C27.6277 7.0625 27.1508 7.26004 26.7992 7.61168C26.4475 7.96331 26.25 8.44022 26.25 8.9375C26.25 9.43478 26.4475 9.91169 26.7992 10.2633C27.1508 10.615 27.6277 10.8125 28.125 10.8125C29.6168 10.8125 31.0476 11.4051 32.1025 12.46C33.1574 13.5149 33.75 14.9457 33.75 16.4375C33.7473 17.4223 33.4862 18.3892 32.9926 19.2414C32.4991 20.0936 31.7904 20.8013 30.9375 21.2938C30.6595 21.4541 30.4273 21.6831 30.2632 21.9589C30.099 22.2347 30.0084 22.5479 30 22.8688C29.9922 23.1871 30.0655 23.5021 30.2131 23.7842C30.3607 24.0663 30.5778 24.3062 30.8438 24.4813L31.575 24.9688L31.8187 25.1C34.0789 26.172 35.9856 27.8675 37.3143 29.9868C38.6431 32.1062 39.3385 34.5611 39.3187 37.0625C39.3187 37.5598 39.5163 38.0367 39.8679 38.3883C40.2196 38.74 40.6965 38.9375 41.1937 38.9375C41.691 38.9375 42.1679 38.74 42.5196 38.3883C42.8712 38.0367 43.0687 37.5598 43.0687 37.0625C43.0841 34.1852 42.3634 31.3517 40.9753 28.8314C39.5871 26.311 37.5775 24.1875 35.1375 22.6625Z"
                    fill="#31d583"
                  />
                </svg>
              </div>
              <div class="flex-grow flex flex-col justify-start items-start gap-2">
                <div class="h-6">
                  <div
                    class="text-[#344053] text-base font-medium font-sora leading-normal"
                  >
                    Total Test GIM
                  </div>
                </div>
                <div class="h-8">
                  <div
                    class="text-[#344053] text-2xl font-bold font-['Roboto'] leading-loose"
                  >
                    {{ dataStats.data_counts[1] }} Siswa
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Total Tes Assessment -->
          <div
            class="h-28 p-6 bg-white rounded-xl border-l-4 border-[#fcb022] flex justify-start items-center gap-4"
          >
            <div class="flex justify-start items-center gap-4">
              <div class="w-[45px] h-[45px] relative">
                <svg
                  width="45"
                  height="46"
                  viewBox="0 0 45 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.0625 23.4125C24.063 22.5465 24.8654 21.4754 25.4154 20.2719C25.9654 19.0684 26.25 17.7607 26.25 16.4375C26.25 13.9511 25.2623 11.5665 23.5041 9.80837C21.746 8.05022 19.3614 7.0625 16.875 7.0625C14.3886 7.0625 12.004 8.05022 10.2459 9.80837C8.48772 11.5665 7.5 13.9511 7.5 16.4375C7.49999 17.7607 7.78463 19.0684 8.33461 20.2719C8.88459 21.4754 9.68704 22.5465 10.6875 23.4125C8.06276 24.601 5.83587 26.5204 4.27309 28.941C2.7103 31.3617 1.87776 34.1812 1.875 37.0625C1.875 37.5598 2.07254 38.0367 2.42417 38.3883C2.77581 38.74 3.25272 38.9375 3.75 38.9375C4.24728 38.9375 4.72419 38.74 5.07583 38.3883C5.42746 38.0367 5.625 37.5598 5.625 37.0625C5.625 34.0788 6.81026 31.2173 8.92005 29.1075C11.0298 26.9978 13.8913 25.8125 16.875 25.8125C19.8587 25.8125 22.7202 26.9978 24.83 29.1075C26.9397 31.2173 28.125 34.0788 28.125 37.0625C28.125 37.5598 28.3225 38.0367 28.6742 38.3883C29.0258 38.74 29.5027 38.9375 30 38.9375C30.4973 38.9375 30.9742 38.74 31.3258 38.3883C31.6775 38.0367 31.875 37.5598 31.875 37.0625C31.8722 34.1812 31.0397 31.3617 29.4769 28.941C27.9141 26.5204 25.6872 24.601 23.0625 23.4125ZM16.875 22.0625C15.7625 22.0625 14.6749 21.7326 13.7499 21.1145C12.8249 20.4964 12.1039 19.6179 11.6782 18.5901C11.2524 17.5623 11.141 16.4313 11.3581 15.3401C11.5751 14.249 12.1109 13.2467 12.8975 12.46C13.6842 11.6734 14.6865 11.1376 15.7776 10.9206C16.8688 10.7035 17.9998 10.8149 19.0276 11.2407C20.0554 11.6664 20.9339 12.3874 21.552 13.3124C22.1701 14.2374 22.5 15.325 22.5 16.4375C22.5 17.9293 21.9074 19.3601 20.8525 20.415C19.7976 21.4699 18.3668 22.0625 16.875 22.0625ZM35.1375 22.6625C36.3374 21.3112 37.1213 19.642 37.3946 17.8556C37.668 16.0693 37.4192 14.242 36.6783 12.5938C35.9374 10.9455 34.7359 9.54649 33.2184 8.56517C31.7009 7.58384 29.9321 7.06202 28.125 7.0625C27.6277 7.0625 27.1508 7.26004 26.7992 7.61168C26.4475 7.96331 26.25 8.44022 26.25 8.9375C26.25 9.43478 26.4475 9.91169 26.7992 10.2633C27.1508 10.615 27.6277 10.8125 28.125 10.8125C29.6168 10.8125 31.0476 11.4051 32.1025 12.46C33.1574 13.5149 33.75 14.9457 33.75 16.4375C33.7473 17.4223 33.4862 18.3892 32.9926 19.2414C32.4991 20.0936 31.7904 20.8013 30.9375 21.2938C30.6595 21.4541 30.4273 21.6831 30.2632 21.9589C30.099 22.2347 30.0084 22.5479 30 22.8688C29.9922 23.1871 30.0655 23.5021 30.2131 23.7842C30.3607 24.0663 30.5778 24.3062 30.8438 24.4813L31.575 24.9688L31.8187 25.1C34.0789 26.172 35.9856 27.8675 37.3143 29.9868C38.6431 32.1062 39.3385 34.5611 39.3187 37.0625C39.3187 37.5598 39.5163 38.0367 39.8679 38.3883C40.2196 38.74 40.6965 38.9375 41.1937 38.9375C41.691 38.9375 42.1679 38.74 42.5196 38.3883C42.8712 38.0367 43.0687 37.5598 43.0687 37.0625C43.0841 34.1852 42.3634 31.3517 40.9753 28.8314C39.5871 26.311 37.5775 24.1875 35.1375 22.6625Z"
                    fill="#fcb022"
                  />
                </svg>
              </div>
              <div class="flex-grow flex flex-col justify-start items-start gap-2">
                <div class="h-6">
                  <div
                    class="text-[#344053] text-base font-medium font-sora leading-normal"
                  >
                    Total Test Assessment
                  </div>
                </div>
                <div class="h-8">
                  <div
                    class="text-[#344053] text-2xl font-bold font-['Roboto'] leading-loose"
                  >
                    {{ dataStats.data_counts[2] }} Siswa
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Total Tes IQ -->
          <div
            class="h-28 p-6 bg-white rounded-xl border-l-4 border-[#53b0fd] flex justify-start items-center gap-4"
          >
            <div class="flex justify-start items-center gap-4">
              <div class="w-[45px] h-[45px] relative">
                <svg
                  width="45"
                  height="46"
                  viewBox="0 0 45 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.0625 23.4125C24.063 22.5465 24.8654 21.4754 25.4154 20.2719C25.9654 19.0684 26.25 17.7607 26.25 16.4375C26.25 13.9511 25.2623 11.5665 23.5041 9.80837C21.746 8.05022 19.3614 7.0625 16.875 7.0625C14.3886 7.0625 12.004 8.05022 10.2459 9.80837C8.48772 11.5665 7.5 13.9511 7.5 16.4375C7.49999 17.7607 7.78463 19.0684 8.33461 20.2719C8.88459 21.4754 9.68704 22.5465 10.6875 23.4125C8.06276 24.601 5.83587 26.5204 4.27309 28.941C2.7103 31.3617 1.87776 34.1812 1.875 37.0625C1.875 37.5598 2.07254 38.0367 2.42417 38.3883C2.77581 38.74 3.25272 38.9375 3.75 38.9375C4.24728 38.9375 4.72419 38.74 5.07583 38.3883C5.42746 38.0367 5.625 37.5598 5.625 37.0625C5.625 34.0788 6.81026 31.2173 8.92005 29.1075C11.0298 26.9978 13.8913 25.8125 16.875 25.8125C19.8587 25.8125 22.7202 26.9978 24.83 29.1075C26.9397 31.2173 28.125 34.0788 28.125 37.0625C28.125 37.5598 28.3225 38.0367 28.6742 38.3883C29.0258 38.74 29.5027 38.9375 30 38.9375C30.4973 38.9375 30.9742 38.74 31.3258 38.3883C31.6775 38.0367 31.875 37.5598 31.875 37.0625C31.8722 34.1812 31.0397 31.3617 29.4769 28.941C27.9141 26.5204 25.6872 24.601 23.0625 23.4125ZM16.875 22.0625C15.7625 22.0625 14.6749 21.7326 13.7499 21.1145C12.8249 20.4964 12.1039 19.6179 11.6782 18.5901C11.2524 17.5623 11.141 16.4313 11.3581 15.3401C11.5751 14.249 12.1109 13.2467 12.8975 12.46C13.6842 11.6734 14.6865 11.1376 15.7776 10.9206C16.8688 10.7035 17.9998 10.8149 19.0276 11.2407C20.0554 11.6664 20.9339 12.3874 21.552 13.3124C22.1701 14.2374 22.5 15.325 22.5 16.4375C22.5 17.9293 21.9074 19.3601 20.8525 20.415C19.7976 21.4699 18.3668 22.0625 16.875 22.0625ZM35.1375 22.6625C36.3374 21.3112 37.1213 19.642 37.3946 17.8556C37.668 16.0693 37.4192 14.242 36.6783 12.5938C35.9374 10.9455 34.7359 9.54649 33.2184 8.56517C31.7009 7.58384 29.9321 7.06202 28.125 7.0625C27.6277 7.0625 27.1508 7.26004 26.7992 7.61168C26.4475 7.96331 26.25 8.44022 26.25 8.9375C26.25 9.43478 26.4475 9.91169 26.7992 10.2633C27.1508 10.615 27.6277 10.8125 28.125 10.8125C29.6168 10.8125 31.0476 11.4051 32.1025 12.46C33.1574 13.5149 33.75 14.9457 33.75 16.4375C33.7473 17.4223 33.4862 18.3892 32.9926 19.2414C32.4991 20.0936 31.7904 20.8013 30.9375 21.2938C30.6595 21.4541 30.4273 21.6831 30.2632 21.9589C30.099 22.2347 30.0084 22.5479 30 22.8688C29.9922 23.1871 30.0655 23.5021 30.2131 23.7842C30.3607 24.0663 30.5778 24.3062 30.8438 24.4813L31.575 24.9688L31.8187 25.1C34.0789 26.172 35.9856 27.8675 37.3143 29.9868C38.6431 32.1062 39.3385 34.5611 39.3187 37.0625C39.3187 37.5598 39.5163 38.0367 39.8679 38.3883C40.2196 38.74 40.6965 38.9375 41.1937 38.9375C41.691 38.9375 42.1679 38.74 42.5196 38.3883C42.8712 38.0367 43.0687 37.5598 43.0687 37.0625C43.0841 34.1852 42.3634 31.3517 40.9753 28.8314C39.5871 26.311 37.5775 24.1875 35.1375 22.6625Z"
                    fill="#53b0fd"
                  />
                </svg>
              </div>
              <div class="flex-grow flex flex-col justify-start items-start gap-2">
                <div class="h-6">
                  <div
                    class="text-[#344053] text-base font-medium font-sora leading-normal"
                  >
                    Total Test IQ
                  </div>
                </div>
                <div class="h-8">
                  <div
                    class="text-[#344053] text-2xl font-bold font-['Roboto'] leading-loose"
                  >
                    {{ dataStats.data_counts[2] }} Siswa
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bar Chart -->
          <div class="bg-white p-4 flex flex-col rounded-xl">
            <div class="text-[#0c141c] text-lg font-medium font-['Roboto'] leading-loose">
              Statistik Sistem Operasi Kecerdasan Dominan
            </div>

            <div class="py-4 h-[340px]">
              <Bar :data="data" :options="options" />
            </div>
          </div>
        </div>

        <!-- Dougnut & Pie Chart -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-[36px] mt-7">
          <div class="bg-white p-4 flex flex-col rounded-xl">
            <div class="text-[#0c141c] text-lg font-medium font-['Roboto'] leading-loose">
              Statistik Diagnostic Assessment
            </div>

            <div class="px-8 flex flex-col lg:flex-row items-center gap-4">
              <div class="w-full md:w-[200px]">
                <Doughnut :data="dataSkorIQ" :options="optionsSkorIQ" />
              </div>

              <div class="w-full mx-[30px] flex flex-col gap-[16px]">
                <div
                  v-for="(item, index) in arrListIQ"
                  :key="index"
                  class="flex justify-between items-center"
                >
                  <div class="flex items-center gap-2">
                    <div
                      :class="item.color"
                      class="w-[20px] h-[20px] rounded-[50%]"
                    ></div>
                    <span
                      class="text-[#667084] text-base font-normal font-['Roboto'] leading-normal"
                    >
                      {{ item.kategori }}
                    </span>
                  </div>

                  <span
                    class="text-[#667084] text-base font-medium font-['Roboto'] leading-normal"
                  >
                    {{ item.persentase }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white p-4 flex flex-col rounded-xl">
            <div class="text-[#0c141c] text-lg font-medium font-['Roboto'] leading-loose">
              Statistik Skor IQ
            </div>

            <div class="px-8 flex flex-col lg:flex-row items-center gap-4">
              <div class="w-full md:w-[200px]">
                <Pie :data="dataSkorIQ" :options="optionsSkorIQ" />
              </div>

              <div class="w-full mx-[30px] flex flex-col gap-[16px]">
                <div
                  v-for="(item, index) in arrListIQ"
                  :key="index"
                  class="flex justify-between items-center"
                >
                  <div class="flex items-center gap-2">
                    <div
                      :class="item.color"
                      class="w-[20px] h-[20px] rounded-[50%]"
                    ></div>
                    <span
                      class="text-[#667084] text-base font-normal font-['Roboto'] leading-normal"
                    >
                      {{ item.kategori }}
                    </span>
                  </div>

                  <span
                    class="text-[#667084] text-base font-medium font-['Roboto'] leading-normal"
                  >
                    {{ item.persentase }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Overview Data Siswa -->
        <div class="bg-white p-4 flex flex-col rounded-xl mt-10">
          <div
            class="flex flex-col justify-start lg:flex-row lg:justify-between items-start lg:items-center mb-5 px-4"
          >
            <div class="text-[#0c141c] font-['Roboto'] leading-loose">
              <div class="text-xl md:text-3xl font-semibold">Overview Data Siswa</div>
              <span class="text-gray-500 text-sm">200 entries found</span>
            </div>

            <RouterLink
              :to="{ name: 'kepsek.siswa.dashboard' }"
              class="text-blue-500 hover:text-blue-700 font-medium flex items-center gap-3"
            >
              Lihat Selengkapnya
              <svg
                width="9"
                height="16"
                viewBox="0 0 9 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1.25L7.75 8L1 14.75"
                  stroke="#008AFF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </RouterLink>
          </div>

          <div class="overflow-auto w-full">
            <table
              class="w-full border-separate border-spacing-0 text-left text-[#0c141c] text-sm font-['Roboto'] leading-normal"
            >
              <thead class="text-[#344053]">
                <tr>
                  <th class="py-3 px-4">PROFIL</th>
                  <th class="py-3 px-4">KELAS</th>
                  <th class="py-3 px-4">NAMA SEKOLAH</th>
                  <th class="py-3 px-4">TERAKHIR TES</th>
                  <th class="py-3 px-4">TOTAL TES</th>
                  <th class="py-3 px-4">AKSI</th>
                </tr>
              </thead>

              <tbody>
                <tr class="border-b">
                  <td class="py-3 px-4 flex items-center gap-2">
                    <img
                      src="../Kepsek/karina.jpg"
                      alt="Eka"
                      class="w-8 h-8 rounded-full mr-2"
                    />
                    Eka
                  </td>
                  <td class="py-3 px-4">10 rpl 1</td>
                  <td class="py-3 px-4">SMKN 1 Cianjur</td>
                  <td class="py-3 px-4">22 MAR, 2024</td>
                  <td class="py-3 px-4">1</td>
                  <td class="py-3 px-4">
                    <button
                      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
                    >
                      Lihat Detail
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.66669 8.33335L8.33335 1.66669M8.33335 1.66669H1.66669M8.33335 1.66669V8.33335"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </Layout>
</template>

<script setup>
import Layout from "@/Layout/Kepsek/Layout.vue";
import initAPI from "../../../../api/api";
import Cookies from "js-cookie";
import { RouterLink } from "vue-router";
import { ref, onMounted, watch } from "vue";
import Swal from "sweetalert2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar, Pie, Doughnut } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const dataStats = ref({
  data_counts: [0, 0, 0, 0],
  data_statistic_bar: [],
  data_statistic_pie: [],
});

const token = Cookies.get("token");
const fetchDataStatusAPI = async () => {
  try {
    const response = await initAPI("get", `staff/data-stats`, null, token);
    dataStats.value = response.data;
    data.value = {
      labels: [
        "Limbik Kiri Ekstrovert",
        "Limbik Kiri Introvert",
        "Limbik Kanan Ekstrovert",
        "Limbik Kiri Introvert",
        "Neokorteks Kiri Ekstrovert",
        "Neokorteks Kiri Instrovert",
        "Neokorteks Kanan Ekstrovert",
        "Neokorteks Kanan Introvert",
        "Otak Tengah",
      ],
      datasets: [
        {
          axis: "y",
          label: "Grafik Gaya Belajar",
          backgroundColor: ["#8383FB"], // Colors for each bar
          borderColor: ["#8383FB"],
          borderWidth: 1,
          data: dataStats.value.data_statistic_bar,
          // data: persentaseJawaban.value
        },
      ],
    };
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Terjadi error saat mengambil data Assessment user.",
      showConfirmButton: false,
      timer: 2000,
    });
  }
};

onMounted(async () => {
  await fetchDataStatusAPI();
  keren.value += 1;
});

const data = ref("");

const options = ref({
  indexAxis: "y",
  responsive: true,
  maintainAspectRatio: false, // Disable default aspect ratio
  // aspectRatio: 1,
  plugins: {
    legend: {
      display: false, // Hide the legend
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          return `${context.dataset.label}: ${context.raw}`;
        },
      },
      bodyColor: "#ffffff",
      titleColor: "#ffffff",
    },
  },
});

const dataSkorIQ = ref({
  labels: ["Visual", "Auditori", "Kinestetik", "a", "b"],
  datasets: [
    {
      backgroundColor: ["#f97066", "#fdb022", "#32d583", "#9ea5d1", "#36bffa"],
      data: [30, 10, 15, 20, 25],
    },
  ],
});

const optionsSkorIQ = {
  plugins: {
    legend: {
      display: false, // Hide the legend
    },
  },
  responsive: true,
  maintainAspectRatio: false,
};

const arrListIQ = ref([
  { kategori: "> 119", persentase: "30%", color: "bg-[#f97066]" },
  { kategori: "111 - 119", persentase: "10%", color: "bg-[#fdb022]" },
  { kategori: "91 - 110", persentase: "15%", color: "bg-[#32d583]" },
  { kategori: "80 - 90", persentase: "20%", color: "bg-[#9ea5d1]" },
  { kategori: "< 80", persentase: "25%", color: "bg-[#36bffa]" },
]);
</script>
