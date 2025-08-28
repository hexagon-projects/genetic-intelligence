<script setup>
import { ref, onMounted, computed } from 'vue'
import Cookies from 'js-cookie'
import initAPI from '../../../../../../api/api'

const props = defineProps({
    idUser: Number
})

const formData = ref({
  kelahiran_bawaan: '',
  riwayat_penyakit: '',
  pranatal: '',
  partus: '',
  minum_susu: '',
  keterangan: '',
  hubungan_keluarga: '',
  hubungan_dengan_ayah: '',
  hubungan_dengan_ibu: '',
  hubungan_dengan_saudara: '',
  perkembangan_fisik: '',
  perkembangan_mental: '',
  perkembangan_emosi_anak: '',
  perkembangan_sosial_anak: '',
  riwayat_pendidikan_formal: ''
})

const isLoading = ref(false)
const pemeriksaanId = ref(null)

const fetchPemeriksaanData = async () => {
  const token = Cookies.get('token')
  if (!token || !props.idUser) return

  try {
    isLoading.value = true
    const response = await initAPI(
      'get',
      `customers/pemeriksaan?customer_id=${props.idUser}`,
      null,
      token
    )

    if (response.data && response.data.data && response.data.data.length > 0) {
      const data = response.data.data[0]
      pemeriksaanId.value = data.id
      
      formData.value = {
        kelahiran_bawaan: data.kelahiran_bawaan || '',
        riwayat_penyakit: data.riwayat_penyakit || '',
        pranatal: data.pranatal || '',
        partus: data.partus || '',
        minum_susu: data.minum_susu || '',
        keterangan: data.keterangan || '',
        hubungan_keluarga: data.hubungan_keluarga || '',
        hubungan_dengan_ayah: data.hubungan_dengan_ayah || '',
        hubungan_dengan_ibu: data.hubungan_dengan_ibu || '',
        hubungan_dengan_saudara: data.hubungan_dengan_saudara || '',
        perkembangan_fisik: data.perkembangan_fisik || '',
        perkembangan_mental: data.perkembangan_mental || '',
        perkembangan_emosi_anak: data.perkembangan_emosi_anak || '',
        perkembangan_sosial_anak: data.perkembangan_sosial_anak || '',
        riwayat_pendidikan_formal: data.riwayat_pendidikan_formal || ''
      }
    }
  } catch (error) {
    console.error('Error fetching pemeriksaan data:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchPemeriksaanData()
})
</script>

<template>
    <div class="space-y-6 md:space-y-8">
        <div class="space-y-4 md:space-y-6 bg-gray-100 p-4 rounded-xl">
            <div class="space-y-2 flex flex-col">
                <label class="text-[#8E8E8E] text-xs md:text-sm">Kelainan Bawaan</label>
                <div 
                    class="p-3 rounded-lg bg-white text-sm md:text-base border border-gray-400 min-h-[120px] whitespace-pre-wrap"
                >{{ formData.kelahiran_bawaan || '-' }}</div>
            </div>
            <div class="space-y-2 flex flex-col">
                <label class="text-[#8E8E8E] text-xs md:text-sm">Penyakit yang Pernah diderita</label>
                <div 
                    class="p-3 rounded-lg bg-white text-sm md:text-base border border-gray-400 min-h-[120px] whitespace-pre-wrap"
                >{{ formData.riwayat_penyakit || '-' }}</div>
            </div>
            <div class="grid grid-cols-2 gap-4 md:gap-6">
                <div class="space-y-2 flex flex-col">
                    <label class="text-[#8E8E8E] text-xs md:text-sm">Kelahiran Pranatal</label>
                    <div 
                        class="p-3 rounded-lg bg-white text-sm md:text-base"
                    >{{ formData.pranatal || '-' }}</div>
                </div>
                <div class="space-y-2 flex flex-col">
                    <label class="text-[#8E8E8E] text-xs md:text-sm">Kelahiran Partus</label>
                    <div 
                        class="p-3 rounded-lg bg-white text-sm md:text-base"
                    >{{ formData.partus || 'Normal' }}</div>
                </div>
            </div>
            <div class="space-y-2 flex flex-col">
                <label class="text-[#8E8E8E] text-xs md:text-sm">Minum Susu</label>
                <div 
                    class="p-3 rounded-lg bg-white text-sm md:text-base"
                >{{ formData.minum_susu || 'ASI' }}</div>
            </div>
            <div class="space-y-2 flex flex-col">
                <label class="text-[#8E8E8E] text-xs md:text-sm">Keterangan Lainnya</label>
                <div 
                    class="p-3 rounded-lg bg-white text-sm md:text-base border border-gray-400 min-h-[120px] whitespace-pre-wrap"
                >{{ formData.keterangan || '-' }}</div>
            </div>
        </div>

        <div class="space-y-6 md:space-y-8">
            <div class="space-y-4 md:space-y-6">
                <h3 class="text-base md:text-xl font-medium">Hubungan Keluarga</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div class="space-y-2 flex flex-col">
                        <label class="text-[#8E8E8E] text-xs md:text-sm">Ayah dengan Ibu</label>
                        <div 
                            class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base"
                        >{{ formData.hubungan_keluarga || '-' }}</div>
                    </div>
                    <div class="space-y-2 flex flex-col">
                        <label class="text-[#8E8E8E] text-xs md:text-sm">Ayah dengan Anak</label>
                        <div 
                            class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base"
                        >{{ formData.hubungan_dengan_ayah || '-' }}</div>
                    </div>
                    <div class="space-y-2 flex flex-col">
                        <label class="text-[#8E8E8E] text-xs md:text-sm">Ibu dengan Anak</label>
                        <div 
                            class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base"
                        >{{ formData.hubungan_dengan_ibu || '-' }}</div>
                    </div>
                    <div class="space-y-2 flex flex-col">
                        <label class="text-[#8E8E8E] text-xs md:text-sm">Anak dengan Anak</label>
                        <div 
                            class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base"
                        >{{ formData.hubungan_dengan_saudara || '-' }}</div>
                    </div>
                </div>
            </div>

            <div class="space-y-4 md:space-y-6">
                <h3 class="text-base md:text-xl font-medium">Perkembangan Anak</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div class="space-y-2 flex flex-col">
                        <label class="text-[#8E8E8E] text-xs md:text-sm">Perkembangan Fisik</label>
                        <div 
                            class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base"
                        >{{ formData.perkembangan_fisik || '-' }}</div>
                    </div>
                    <div class="space-y-2 flex flex-col">
                        <label class="text-[#8E8E8E] text-xs md:text-sm">Perkembangan Mental</label>
                        <div 
                            class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base"
                        >{{ formData.perkembangan_mental || '-' }}</div>
                    </div>
                    <div class="space-y-2 flex flex-col">
                        <label class="text-[#8E8E8E] text-xs md:text-sm">Perkembangan Emosi</label>
                        <div 
                            class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base"
                        >{{ formData.perkembangan_emosi_anak || '-' }}</div>
                    </div>
                    <div class="space-y-2 flex flex-col">
                        <label class="text-[#8E8E8E] text-xs md:text-sm">Perkembangan Sosial</label>
                        <div 
                            class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base"
                        >{{ formData.perkembangan_sosial_anak || '-' }}</div>
                    </div>
                    <div class="space-y-2 flex flex-col">
                        <label class="text-[#8E8E8E] text-xs md:text-sm">Riwayat Pendidikan Formal</label>
                        <div 
                            class="p-3 rounded-lg bg-[#f5f5f5] text-sm md:text-base"
                        >{{ formData.riwayat_pendidikan_formal || '-' }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>