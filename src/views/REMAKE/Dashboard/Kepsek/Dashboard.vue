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
            Welcome Back, {{ staffName }}
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
              <div class="flex-grow flex flex-col justify-start items-start">
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
                    {{ data_test_counts[0] }} Siswa
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
              <div class="flex-grow flex flex-col justify-start items-start">
                <div class="h-6">
                  <div
                    class="text-[#344053] text-sm font-medium font-sora leading-normal"
                  >
                    Total Test GIM
                  </div>
                </div>
                <div class="h-8">
                  <div
                    class="text-[#344053] text-2xl font-bold font-['Roboto'] leading-loose"
                  >
                    {{ data_test_counts[1] }} Siswa
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
              <div class="flex-grow flex flex-col justify-start items-start">
                <div class="h-6">
                  <div
                    class="text-[#344053] text-sm font-medium font-sora leading-normal"
                  >
                    Total Test Assessment
                  </div>
                </div>
                <div class="h-8">
                  <div
                    class="text-[#344053] text-2xl font-bold font-['Roboto'] leading-loose"
                  >
                    {{ data_test_counts[2] }} Siswa
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Total Tes IQ -->
          <div
            class="h-28 p-6 bg-white rounded-xl border-l-4 border-[#53B1FD] flex justify-start items-center gap-4"
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
                    fill="#53B1FD"
                  />
                </svg>
              </div>
              <div class="flex-grow flex flex-col justify-start items-start">
                <div class="h-6">
                  <div
                    class="text-[#344053] text-sm font-medium font-sora leading-normal"
                  >
                    Total Test IQ
                  </div>
                </div>
                <div class="h-8">
                  <div
                    class="text-[#344053] text-2xl font-bold font-['Roboto'] leading-loose"
                  >
                    {{ data_test_counts[3] }} Siswa
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bar Chart -->
        <div class="bg-white p-4 flex flex-col rounded-xl">
          <div
            class="text-[#0c141c] text-lg font-medium font-['Roboto'] leading-loose"
          >
            Statistik Sistem Operasi Kecerdasan Dominan
          </div>

          <apexchart
            type="bar"
            height="300"
            :options="data_bar.chartOptions"
            :series="data_bar.series"
          ></apexchart>
        </div>
      </div>

      <!-- Dougnut & Pie Chart -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-[36px] mt-7">
        <!-- Statistik Diagnostic Assessment -->
        <div class="bg-white p-4 flex flex-col rounded-xl">
          <div
            class="text-[#0c141c] text-lg font-medium font-['Roboto'] leading-loose"
          >
            Statistik Diagnostic Assessment
          </div>

          <div class="px-8 py-2 flex flex-col lg:flex-row items-center gap-4">
            <div class="w-full">
              <apexchart
                type="radialBar"
                height="350"
                :options="data_pie_1.chartOptions"
                :series="data_pie_1.series"
              ></apexchart>
            </div>

            <div class="w-full mx-[30px] flex flex-col gap-[12px]">
              <div
                v-for="(item, index) in arrAssessment"
                :key="index"
                class="flex justify-between items-center"
              >
                <div class="flex items-center gap-2">
                  <div :class="item.color" class="w-[20px] h-[20px]"></div>
                  <span
                    class="text-[#667084] text-sm font-normal font-['Roboto'] leading-normal"
                  >
                    {{ item.kategori }}
                  </span>
                </div>
                <span
                  class="text-[#667084] text-sm font-medium font-['Roboto'] leading-normal"
                >
                  {{ item.persentase }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Statistik Skor IQ -->
        <div class="bg-white p-4 flex flex-col rounded-xl">
          <div
            class="text-[#0c141c] text-lg font-medium font-['Roboto'] leading-loose"
          >
            Statistik Skor IQ
          </div>

          <div class="px-8 py-2 flex flex-col lg:flex-row items-center gap-4">
            <div class="w-full">
              <apexchart
                type="polarArea"
                height="350"
                :options="data_pie_2.chartOptions"
                :series="data_pie_2.series"
              ></apexchart>
            </div>

            <div class="w-full mx-[30px] flex flex-col gap-[12px]">
              <div
                v-for="(item, index) in arrIq"
                :key="index"
                class="flex justify-between items-center"
              >
                <div class="flex items-center gap-2">
                  <div
                    :class="item.color"
                    class="w-[20px] h-[20px] rounded-full"
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

      <div class="bg-white p-4 flex flex-col rounded-xl mt-10">
        <div
          class="flex flex-col justify-start lg:flex-row lg:justify-between items-start lg:items-center mb-5 px-4"
        >
          <div class="text-[#0c141c] font-['Roboto'] leading-loose space-y-4">
            <div class="text-lg md:text-xl font-semibold mb-5">
              Keterangan Klarifikasi Hasil Test:
            </div>

            <!-- 1 -->
            <div
              class="bg-[#F4F3FF] p-5 rounded-lg"
              v-if="data_desc"
              v-for="(desc, index) in data_desc"
              :key="desc[0].id"
            >
              <div class="flex items-start gap-4">
                <div
                  class="flex justify-center items-center w-12 h-12 bg-white rounded-full shadow-md"
                >
                  <svg
                    v-if="index == 0"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1771_11163)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M15.8824 6.42999C16.1614 5.77702 16.9169 5.4739 17.5699 5.75292C19.0358 6.37934 20.6844 6.42783 22.1846 5.88866C22.8528 5.64849 23.5892 5.99549 23.8294 6.66372C24.0696 7.33197 23.7226 8.06836 23.0544 8.30853C20.9429 9.06739 18.6226 8.99914 16.5594 8.1175C15.9065 7.83847 15.6034 7.08295 15.8824 6.42999ZM6.4215 18.2594C4.96209 17.6233 3.31449 17.57 1.81701 18.1105C1.14911 18.3517 0.412232 18.0056 0.171145 17.3377C-0.0699423 16.6698 0.276058 15.9329 0.943959 15.6919C3.05956 14.9282 5.38725 15.0035 7.44908 15.9023C8.09999 16.1861 8.39764 16.9438 8.11389 17.5946C7.83013 18.2456 7.07243 18.5433 6.4215 18.2594ZM9.54352 7.70885C9.04143 7.20674 8.22736 7.20674 7.72525 7.70885C7.22315 8.21095 7.22315 9.02501 7.72525 9.52713L14.4727 16.2746C14.9748 16.7767 15.7889 16.7767 16.291 16.2746C16.7931 15.7725 16.7931 14.9584 16.291 14.4563L9.54352 7.70885Z"
                        fill="#2626C6"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M18.1073 1.82595C18.3533 1.15985 18.0128 0.420445 17.3467 0.17445C16.6806 -0.0715459 15.9412 0.269024 15.6952 0.935132C14.9181 3.03933 14.9658 5.35961 15.8289 7.43004L15.8302 7.43326C16.3237 8.60803 16.4577 9.90274 16.2152 11.1537C15.9731 12.403 15.3664 13.5525 14.4718 14.4574C13.5493 15.3732 12.376 15.9949 11.1001 16.2439C10.4032 16.3799 9.94853 17.0552 10.0845 17.7521C10.2206 18.449 10.8958 18.9038 11.5927 18.7677C13.37 18.4209 15.0043 17.5541 16.2884 16.2773L16.2954 16.2703C17.5498 15.0035 18.4004 13.3931 18.7397 11.6429C19.0788 9.89323 18.8916 8.08233 18.2017 6.43906C17.5891 4.96839 17.5555 3.32047 18.1073 1.82595ZM12.8336 7.7563C13.5306 7.62074 13.9858 6.94579 13.8502 6.24876C13.7146 5.55175 13.0397 5.09661 12.3426 5.23217C10.5734 5.57628 8.9457 6.43646 7.66465 7.70429L7.65421 7.71473C6.4023 8.9825 5.55342 10.5923 5.21444 12.3415C4.87546 14.0906 5.06151 15.901 5.7492 17.5447L5.75226 17.5519C6.37902 19.0245 6.42756 20.6794 5.88816 22.1861C5.64886 22.8547 5.99681 23.5906 6.66534 23.8299C7.33388 24.0693 8.06984 23.7214 8.30916 23.0529C9.06615 20.9381 8.99856 18.6159 8.11998 16.5488C7.62927 15.3741 7.49669 14.0806 7.7389 12.8307C7.98089 11.582 8.58615 10.4327 9.47871 9.52678C10.3981 8.61898 11.5652 8.00301 12.8336 7.7563Z"
                        fill="#C1C1FD"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1771_11163">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <svg
                    v-if="index == 1"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.44001 0.23999C3.04818 0.23999 1.92001 1.36816 1.92001 2.75999V21.24C1.92001 22.6318 3.04818 23.76 4.44001 23.76H19.56C20.9518 23.76 22.08 22.6318 22.08 21.24V8.49548C22.0795 7.82742 21.8136 7.18679 21.3408 6.71468L15.6053 0.977476C15.1329 0.505362 14.4924 0.240162 13.8245 0.23999H4.44001Z"
                      fill="#C1C1FD"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.1025 10.9499C12.1025 10.2541 12.6665 9.68994 13.3625 9.68994H17.5625C18.5325 9.68994 19.1387 10.7399 18.6537 11.5799C18.4286 11.9698 18.0127 12.2099 17.5625 12.2099H13.3625C12.6667 12.2099 12.1025 11.6458 12.1025 10.9499Z"
                      fill="#2626C6"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.1025 17.6179C12.1025 16.9221 12.6665 16.3579 13.3625 16.3579H17.5625C18.5325 16.3579 19.1387 17.4081 18.6537 18.2479C18.4286 18.6377 18.0127 18.8779 17.5625 18.8779H13.3625C12.6665 18.8779 12.1025 18.3139 12.1025 17.6179Z"
                      fill="#2626C6"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.5065 14.6207C11.0729 15.0247 11.2044 15.8114 10.8005 16.378L8.45349 19.6607C8.00075 20.2932 7.08858 20.3685 6.53829 19.8186L5.13052 18.4125C4.45629 17.7151 4.78989 16.5494 5.73086 16.3142C6.15241 16.209 6.59863 16.3283 6.91132 16.63L7.26738 16.986L8.74921 14.9112C9.15429 14.346 9.94098 14.2159 10.5065 14.6207Z"
                      fill="#2626C6"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.5065 7.84696C11.074 8.25119 11.2056 9.03925 10.8005 9.60599L8.4535 12.8904C8.00076 13.523 7.08859 13.5982 6.5383 13.0483L5.13053 11.6405C4.46933 10.9308 4.82419 9.77159 5.76928 9.55371C6.17728 9.45976 6.60516 9.57428 6.91133 9.85971L7.26739 10.2142L8.74922 8.14096C9.15328 7.57474 9.93996 7.44308 10.5065 7.84696Z"
                      fill="#2626C6"
                    />
                  </svg>
                  <svg
                    v-if="index == 2"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M17.0263 1.31313C14.6563 -0.0151362 11.8571 -0.351804 9.23975 0.37663C6.62241 1.10506 4.39957 2.83943 3.05653 5.20107C1.71349 7.5627 1.35935 10.3598 2.07143 12.9816C2.7835 15.6035 4.50395 17.8371 6.85716 19.1948V23.1428C6.85716 23.3702 6.94746 23.5882 7.10821 23.7489C7.26895 23.9097 7.48697 24 7.7143 24H16.2857C16.5131 24 16.7311 23.9097 16.8918 23.7489C17.0526 23.5882 17.1429 23.3702 17.1429 23.1428V19.7143H19.7143C20.3963 19.7143 21.0503 19.4434 21.5326 18.9611C22.0148 18.4789 22.2857 17.8248 22.2857 17.1428V10.2857C22.2855 8.45768 21.798 6.66275 20.8736 5.08569C19.9492 3.50863 18.6212 2.20642 17.0263 1.31313Z"
                      fill="#C1C1FD"
                    />
                    <path
                      d="M8.95715 4.6029C7.64972 5.35839 6.64828 6.54804 6.12685 7.96517C5.60541 9.38229 5.59692 10.9373 6.10287 12.36C6.33944 13.0252 7.05773 13.3595 7.74001 13.1778C11.1943 12.2623 14.712 9.78861 16.848 7.85833C17.4137 7.34576 17.532 6.49204 17.028 5.92119C16.0416 4.80376 14.6991 4.06186 13.2281 3.82128C11.7571 3.5807 10.2482 3.85624 8.95715 4.60118V4.6029Z"
                      fill="#2626C6"
                    />
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="font-bold">
                    <span class="text-[#3030F8]">{{ desc[0] }}%</span> siswa
                    memiliki
                    {{
                      index == 0
                        ? "kecerdasan dominan"
                        : index == 1
                        ? "gaya belajar"
                        : "klasifikasi IQ"
                    }}
                    <span class="text-[#3030F8]">{{
                      index == 2 ? desc[1].category : desc[1].name
                    }}</span>
                  </p>
                  <p class="text-sm mb-1">Catatan untuk siswa:</p>
                  <p v-if="index !== 1" class="text-sm">
                    {{ index == 2 ? desc[1].desc : desc[1].description }}
                  </p>
                  <div v-if="index == 1">
                      <p v-for="(item, index) in parsedDesc" class="text-sm">
                        {{ item }}
                      </p>
                  </div>
                </div>
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
            <div class="text-xl md:text-3xl font-semibold">
              Overview Data Siswa
            </div>
            <span class="text-gray-500 text-sm">200 entries found</span>
          </div>

          <RouterLink
            :to="{ name: 'staff.views.list_siswa' }"
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
              <tr v-for="(item, index) in dataSiswa" :key="index" class="border-b">
                <td class="py-3 px-4 flex items-center gap-2">
                  <img
                    src="@/assets/img/profile-mock.png"
                    alt="user"
                    class="w-8 h-8 rounded-full mr-2"
                  />
                  {{ item.name }}
                </td>
                <td class="py-3 px-4">{{ item.grade }} {{ item.majoring }}</td>
                <td class="py-3 px-4">{{ item.institutions.name }}</td>
                <td class="py-3 px-4">{{ item.updated_at }}</td>
                <td class="py-3 px-4">{{ item.total_test }}</td>
                <td class="py-3 px-4">
                  <button @click="detailSiswa(item.id)"
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
import { useRouter } from "vue-router";

const staffName = ref(JSON.parse(localStorage.getItem('userData')).staff.name)
const dataSiswa = ref('')

const data_test_counts = ref([0, 0, 0, 0]);

const data_bar = ref({
  series: [
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ],
  chartOptions: {
    chart: {
      type: "bar",
      height: 300,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: "end",
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "Neokorteks Kiri Introvert",
        "Limbik Kanan Ekstrovert",
        "Limbik Kiri Introvert",
        "Limbik Kiri Ekstrovert",
        "Limbik Kanan Introvert",
        "Neokorteks Kanan Ekstrovert",
        "Neokorteks Kanan Introvert",
        "Neokorteks Kiri Ekstrovert",
        "Otak Tengah",
      ],
    },
  },
});

const data_pie_1 = ref({
  series: [0, 0, 0, 0, 0, 0],
  chartOptions: {
    chart: {
      height: 350,
      type: "radialBar",
    },
    colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "Total",
            formatter: function (w) {
              return w.globals.seriesTotals.reduce((a, b) => {
                return a + b;
              });
            },
          },
        },
      },
    },
    labels: [
      "Visual",
      "Auditori",
      "Kinestetik",
      "Visual & Auditori",
      "Visual & Kinestetik",
      "Auditori & Kinestetik",
    ],
  },
});

const data_pie_2 = ref({
  series: [0, 0, 0, 0, 0],
  chartOptions: {
    colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
    chart: {
      width: 350,
      type: "polarArea",
    },
    labels: ["> 119", "111 - 119", "91 - 110", "80 - 90", "< 80"],
    fill: {
      opacity: 1,
    },
    stroke: {
      width: 1,
      colors: undefined,
    },
    yaxis: {
      show: false,
    },
    legend: {
      show: false,
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 0,
        },
        spokes: {
          strokeWidth: 0,
        },
      },
    },
    theme: {
      monochrome: {
        enabled: true,
        shadeTo: "light",
        shadeIntensity: 0.6,
      },
    },
  },
});

const data_desc = ref([]);
const parsedDesc = ref('')

const token = Cookies.get("token");
const fetchDataStatusAPI = async () => {
  try {
    const response = await initAPI("get", "staff/data-stats", null, token);

    // console.log(`asisia`, Math.max(...response.data.data_gim_result.percentage))

    data_test_counts.value = response.data.data_test_counts;
    data_bar.value.series[0].data = response.data.data_gim_result.counts;
    data_pie_1.value.series = response.data.data_assessment_result.counts;
    data_pie_2.value.series = response.data.data_iq_result.counts;

    arrAssessment.value.map(
      (item, index) =>
        (item.persentase =
        Math.floor(response.data.data_assessment_result.percentage[index]) + "%")
    );
    arrIq.value.map(
      (item, index) =>
        (item.persentase = Math.floor(response.data.data_iq_result.percentage[index]) + "%")
    );

    data_desc.value.push([
    //   Math.max(...response.data.data_gim_result.percentage),
    Math.floor(Math.max(...response.data.data_gim_result.percentage)),
      response.data.data_gim_result.desc,
    ]);

    parsedDesc.value = JSON.parse(response.data.data_assessment_result.desc.description)
    data_desc.value.push([
    Math.floor(Math.max(...response.data.data_assessment_result.percentage)),
      response.data.data_assessment_result.desc,
    ]);

    data_desc.value.push([
      Math.floor(Math.max(...response.data.data_iq_result.percentage)),
      response.data.data_iq_result.desc,
    ]);

    // console.log(data_desc);
  } catch (error) {
    // console.log(error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Terjadi error saat mengambil data Assessment user.",
      showConfirmButton: false,
      timer: 2000,
    });
  }
};

const getSiswa = async() => {
    try {
        const institutionId = localStorage.getItem('userData')
        ? JSON.parse(localStorage.getItem('userData')).staff.institution_id : null
        const response = await initAPI("get", `customers?institution_id=${institutionId}`, null, token);
        // console.log(response.data)

        dataSiswa.value = response.data.data
    } catch (error) {
        Swal.fire({
        icon: "error",
        title: "Error",
        text: "Terjadi error saat mengambil data Assessment user.",
        showConfirmButton: false,
        timer: 2000,
        });
    }
}

onMounted(async () => {
    await Promise.all([fetchDataStatusAPI(), getSiswa()]);
});

const arrAssessment = ref([
  { kategori: "Visual", persentase: "0%", color: "bg-[#8098F9]" },
  { kategori: "Auditori", persentase: "0%", color: "bg-[#444CE7]" },
  { kategori: "Kinestik", persentase: "0%", color: "bg-[#6172F3]" },
  { kategori: "Visual & Auditori", persentase: "0%", color: "bg-[#6172F3]" },
  { kategori: "Visual & Kinestetik", persentase: "0%", color: "bg-[#6172F3]" },
  {
    kategori: "Auditori &  Kinestetik",
    persentase: "0%",
    color: "bg-[#6172F3]",
  },
]);

const arrIq = ref([
  { kategori: "> 119", persentase: "0%", color: "bg-[#175CD3]" },
  { kategori: "111 - 119", persentase: "0%", color: "bg-[#1570EF]" },
  { kategori: "91 - 110", persentase: "0%", color: "bg-[#2E90FA]" },
  { kategori: "80 - 90", persentase: "0%", color: "bg-[#53B1FD]" },
  { kategori: "< 80", persentase: "0%", color: "bg-[#84CAFF]" },
]);

const router = useRouter()

const detailSiswa = (id)  => {
  // console.log(`wakwaw`, id)
  try {
    const encodedId = btoa(id)

    router.push({
      name: 'staff.views.detail_siswa',
      query: { student_id: encodedId }
    })
  } catch (error) {
    Swal.fire({
    icon: "error",
    title: "Error",
    text: "Terjadi error saat navigasi ke detail siswa.",
    showConfirmButton: false,
    timer: 2000,
    });
  }
}
</script>
