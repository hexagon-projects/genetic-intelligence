<template>
    <form id="otp-form">
        <div class="flex items-center justify-center gap-3">
            <input
                type="text"
                class="w-14 h-14 text-center text-2xl font-medium text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                pattern="\d*" maxlength="1" />
            <input
                type="text"
                class="w-14 h-14 text-center text-2xl font-medium text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                maxlength="1" />
            <input
                type="text"
                class="w-14 h-14 text-center text-2xl font-medium text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                maxlength="1" />
            <input
                type="text"
                class="w-14 h-14 text-center text-2xl font-medium text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                maxlength="1" />
        </div>
    </form>
    <div class="max-w-[260px] mx-auto mt-4">
        <button @click="submitCode" id="submitCode"
        class="font-myFont w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-biru px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-opacity-75 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150">
            Konfirmasi
        </button>
    </div>
    <div class="font-myFont flex justify-center gap-1 text-sm text-slate-500 mt-4">
        Tidak menerima code? 
        <a class="font-myFont font-medium text-biru hover:text-opacity-80" href="#0">
            Kirim Ulang
        </a>
    </div>
</template>

<script>
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'

    export default {
        setup(){
            const router = useRouter()
            const codes = ref('')

            const submitCode = () => {
                // alert(codes.value)
                router.push({name: 'views.reset_password', query: { code: '1234', ref: 'wakwaw' }})
            }

            onMounted(() => {
                console.log(`otp yeuh`)
                const form = document.getElementById('otp-form')
                const inputs = [...form.querySelectorAll('input[type=text]')]
                const submit = document.getElementById('submitCode')
        
                const handleKeyDown = (e) => {
                    if (
                        !/^[0-9]{1}$/.test(e.key)
                        && e.key !== 'Backspace'
                        && e.key !== 'Delete'
                        && e.key !== 'Tab'
                        && !e.metaKey
                    ) {
                        e.preventDefault()
                    }
        
                    if (e.key === 'Delete' || e.key === 'Backspace') {
                        const index = inputs.indexOf(e.target);
                        if (index > 0) {
                            inputs[index - 1].value = '';
                            inputs[index - 1].focus();
                        }
                    }
                }
        
                const handleInput = (e) => {
                    const { target } = e;
                    const index = inputs.indexOf(target);
                    if (target.value) {
                        codes.value += target.value; // Menambahkan nilai input ke variabel codes
                        if (index < inputs.length - 1) {
                            inputs[index + 1].focus();
                        } else {
                            submit.focus();
                        }
                    }
                }
        
                const handleFocus = (e) => {
                    e.target.select()
                }
        
                const handlePaste = (e) => {
                    e.preventDefault();
                    const text = e.clipboardData.getData('text');
                    if (!new RegExp(`^[0-9]{${inputs.length}}$`).test(text)) {
                        return;
                    }
                    const digits = text.split('');
                    digits.forEach((digit, index) => {
                        if (index < inputs.length) {
                            inputs[index].value = digit;
                            codes.value += digit; // Menambahkan nilai input ke variabel codes
                        }
                    });
                    if (digits.length === inputs.length) {
                        submit.focus();
                    }
                }

                const handleCtrlV = async(e) => {
                    e.preventDefault();
                }
        
                inputs.forEach((input) => {
                    input.addEventListener('input', handleInput)
                    input.addEventListener('keydown', handleKeyDown)
                    input.addEventListener('focus', handleFocus)
                    input.addEventListener('paste', handlePaste)
                    input.addEventListener('keydown', (e) => {
                        // Memeriksa apakah tombol CTRL + V ditekan
                        if ((e.ctrlKey || e.metaKey) && e.keyCode == 86) {
                            // handleCtrlV(e)
                        }
                    });
                })
            })

            return {
                codes,
                submitCode
            }
        }
    }
</script>