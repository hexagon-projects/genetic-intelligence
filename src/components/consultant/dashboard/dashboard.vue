<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <DashboardHeader @logout="logout" />

    <main class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <StatsOverview :stats="stats" />

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <CalendarSection :calendar-options="calendarOptions" @show-add-slot-modal="showAddSlotModal = true"
          @show-bulk-add-slot-modal="showBulkAddSlotModal = true"
          @show-recurring-slot-modal="showRecurringSlotModal = true" />

        <UpcomingSessions :upcoming-sessions="upcomingSessions" :section-visible="sectionVisible"
          @show-session-details="showSessionDetails" @update-session-status="updateSessionStatus"
          :format-date="formatDate" :get-status-text="getStatusText" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <RecentPatients :recent-patients="recentPatients" @navigate-to-book-list="navigateToBookList"
          :format-date="formatDate" :get-status-text="getStatusText" />

        <RecentTestimonials :testimonials="testimonials" :format-date="formatDate" />
      </div>

      <Specializations :specializations="specializations"
        @show-add-specialization-modal="showAddSpecializationModal = true"
        @remove-specialization="removeSpecialization" />

      <SessionDetailsModal :selected-session="selectedSession" @close="selectedSession = null" :format-date="formatDate"
        :get-status-text="getStatusText" />

      <AddSlotModal :show="showAddSlotModal" :new-slot="newSlot" @close="showAddSlotModal = false" @add-slot="addSlot"
        @update:new-slot="newSlot = $event" />

      <AddSpecializationModal :show="showAddSpecializationModal" :available-specializations="availableSpecializations"
        :new-specialization="newSpecialization" @close="showAddSpecializationModal = false"
        @add-specialization="addSpecialization" @update:new-specialization="newSpecialization = $event" />

      <BulkAddSlotModal :show="showBulkAddSlotModal" :bulk-slot="bulkSlot" :days="days"
        @close="showBulkAddSlotModal = false" @add-bulk-slots="addBulkSlots" @update:bulk-slot="bulkSlot = $event" />

      <RecurringAddSlotModal :show="showRecurringSlotModal" :recurring-slot="recurringSlot" :days="days"
        @close="showRecurringSlotModal = false" @add-recurring-slots="addRecurringSlots" />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter();
const navigateToBookList = () => {
  router.push(`/consultant/bookings`);
};
</script>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import moment from 'moment-timezone'
import initAPI from '@/api/api'
import Cookies from 'js-cookie'

import DashboardHeader from "./DashboardHeader.vue"
import StatsOverview from './StatsOverview.vue'
import CalendarSection from './CalendarSection.vue'
import UpcomingSessions from './UpcomingSessions.vue'
import RecentPatients from './RecentPatients.vue'
import RecentTestimonials from './RecentTestimonials.vue'
import Specializations from './Specializations.vue'
import SessionDetailsModal from './modal/SessionDetailsModal.vue'
import AddSlotModal from './modal/AddSlotModal.vue'
import AddSpecializationModal from './modal/AddSpecializationModal.vue'
import BulkAddSlotModal from './modal/BulkAddSlotModal.vue'
import RecurringAddSlotModal from './modal/RecurringAddSlotModal.vue'

moment.locale('id')

export default {
  components: {
    FullCalendar,
    DashboardHeader,
    StatsOverview,
    CalendarSection,
    UpcomingSessions,
    RecentPatients,
    RecentTestimonials,
    Specializations,
    SessionDetailsModal,
    AddSlotModal,
    AddSpecializationModal,
    BulkAddSlotModal,
    RecurringAddSlotModal
  },
  data() {
    return {
      stats: [
        { title: "Sesi Hari Ini", value: 0 },
        { title: "Pendapatan Bulanan", value: 'Rp 0' },
        { title: "Pasien Baru", value: 0, change: '0%', changeType: 'increase' },
        { title: "Rating Rata-rata", value: '0.0' }
      ],
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'timeGridWeek',
        locale: 'id',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        buttonText: {
          today: 'Hari Ini',
          month: 'Bulan',
          week: 'Minggu',
          day: 'Hari'
        },
        events: [],
        editable: true,
        height: 'auto',
        eventDisplay: 'block',
        dayMaxEvents: false,
        eventTimeFormat: {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        },
        slotLabelFormat: {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }
      },
      upcomingSessions: [],
      recentPatients: [],
      testimonials: [],
      specializations: [],
      availableSpecializations: [],
      selectedSession: null,
      showAddSlotModal: false,
      showBulkAddSlotModal: false,
      showRecurringSlotModal: false,
      showAddSpecializationModal: false,
      newSlot: {
        start_time: '',
        end_time: '',
        duration: 30
      },
      bulkSlot: {
        start_date: '',
        end_date: '',
        start_time: '09:00',
        end_time: '17:00',
        duration: 60,
        days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
      },
      recurringSlot: {
        start_date: '',
        end_date: '',
        start_time: '09:00',
        end_time: '17:00',
        duration: 60,
        repeat_every: 'week',
        repeat_interval: 1,
        days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
      },
      days: [
        { value: 'monday', label: 'Senin' },
        { value: 'tuesday', label: 'Selasa' },
        { value: 'wednesday', label: 'Rabu' },
        { value: 'thursday', label: 'Kamis' },
        { value: 'friday', label: 'Jumat' },
        { value: 'saturday', label: 'Sabtu' },
        { value: 'sunday', label: 'Minggu' }
      ],
      newSpecialization: '',
      consultantId: null,
      sectionVisible: false
    }
  },
  mounted() {
    this.getConsultantId()
    this.fetchDashboardData()
    this.sectionVisible = true
  },
  methods: {
    async getConsultantId() {
      const token = await Cookies.get('token')
      try {
        const response = await initAPI('get', 'consultant-dashboard/stats', null, token)
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData && userData.id) {
          this.consultantId = userData.id;
        } else {
          console.error('Consultant ID not found in userData');
        }
      } catch (error) {
        console.error('Error getting consultant ID:', error)
      }
    },
    async fetchDashboardData() {
      const token = await Cookies.get('token')
      try {
        const statsResponse = await initAPI('get', 'consultant-dashboard/stats', null, token)
        this.stats = [
          { title: "Sesi Hari Ini", value: statsResponse.data.data.today_sessions },
          { title: "Pendapatan Bulanan", value: `Rp ${this.formatCurrency(statsResponse.data.data.monthly_income)}` },
          { title: "Pasien Baru", value: statsResponse.data.data.new_patients },
          { title: "Rating Rata-rata", value: statsResponse.data.data.average_rating ? statsResponse.data.data.average_rating : 'N/A' }
        ]

        const calendarResponse = await initAPI('get', 'consultant-dashboard/calendar', null, token)
        this.calendarOptions.events = calendarResponse.data.data.map(slot => {
          let backgroundColor, borderColor;
          switch (slot.status) {
            case 'available':
              backgroundColor = '#10B981';
              borderColor = '#059669';    
              break;
            case 'booked':
              backgroundColor = '#F59E0B';
              borderColor = '#D97706';    
              break;
            case 'confirmed':
              backgroundColor = '#3B82F6';
              borderColor = '#2563EB';    
              break;
            case 'completed':
              backgroundColor = '#8B5CF6';
              borderColor = '#7C3AED';    
              break;
            case 'cancelled':
              backgroundColor = '#EF4444';
              borderColor = '#DC2626';    
              break;
            default:
              backgroundColor = '#6B7280';
              borderColor = '#4B5563';
          }

          return {
            id: slot.id,
            title: slot.title,
            start: slot.start,
            end: slot.end,
            backgroundColor,
            borderColor,
            extendedProps: {
              status: slot.title,
              booking: slot.booking
            }
          }
        })

        if (this.consultantId) {
          const specsResponse = await initAPI('get', `consultant-dashboard/specializations`, null, token)
          this.specializations = specsResponse.data.data
        }

        const availableSpecsResponse = await initAPI('get', 'consultant-dashboard/specializations-all', null, token)
        this.availableSpecializations = availableSpecsResponse.data.data

        const patientsResponse = await initAPI('get', 'consultant-dashboard/patients', null, token)
        this.recentPatients = patientsResponse.data.data.data

        const testimonialsResponse = await initAPI('get', 'consultant-dashboard/testimonials', null, token)
        this.testimonials = testimonialsResponse.data.data.data

        const sessionsResponse = await initAPI('get', 'consultant-dashboard/sessions', null, token)
        this.upcomingSessions = sessionsResponse.data.data.data
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        if (error.response && error.response.status === 401) {
          this.logout()
        }
      }
    },
    calculateEndTime() {
      if (this.newSlot.start_time && this.newSlot.duration) {
        const startTime = new Date(this.newSlot.start_time + 'Z');
        const durationInMs = this.newSlot.duration * 60 * 1000;
        const endTime = new Date(startTime.getTime() + durationInMs);
        return endTime.toISOString().slice(0, 16);
      }
      return '';
    },
    async addSlot() {
      try {
        if (!this.newSlot.start_time) {
          throw new Error('Waktu mulai harus diisi');
        }
        if (!this.newSlot.duration || this.newSlot.duration < 30) {
          throw new Error('Durasi minimal 30 menit');
        }

        this.newSlot.end_time = this.calculateEndTime();
        const startTime = new Date(this.newSlot.start_time + 'Z');
        const endTime = new Date(this.newSlot.end_time + 'Z');

        if (endTime <= startTime) {
          throw new Error('Waktu selesai harus setelah waktu mulai');
        }

        const token = await Cookies.get('token');
        const response = await initAPI('post', 'consultant-dashboard/slots', this.newSlot, token);

        this.calendarOptions.events.push({
          id: response.data.data.id,
          title: 'Tersedia',
          start: response.data.data.start_time,
          end: response.data.data.end_time,
          backgroundColor: '#10b981',
          borderColor: '#059669',
          extendedProps: {
            status: 'available'
          }
        });

        this.showAddSlotModal = false;
        this.newSlot = { start_time: '', end_time: '', duration: 30 };
      } catch (error) {
        console.error('Error adding slot:', error);
      }
    },
    async addBulkSlots() {
      try {
        if (!this.bulkSlot.start_date || !this.bulkSlot.end_date) {
          throw new Error('Tanggal mulai dan selesai harus diisi');
        }
        if (!this.bulkSlot.start_time || !this.bulkSlot.end_time) {
          throw new Error('Jam mulai dan selesai harus diisi');
        }
        if (!this.bulkSlot.duration || this.bulkSlot.duration < 30) {
          throw new Error('Durasi minimal 30 menit');
        }
        if (!this.bulkSlot.days || this.bulkSlot.days.length === 0) {
          throw new Error('Pilih minimal satu hari');
        }

        const payload = {
          ...this.bulkSlot,
          start_time: this.bulkSlot.start_time,
          end_time: this.bulkSlot.end_time
        };

        const token = await Cookies.get('token');
        const response = await initAPI('post', 'consultant-dashboard/slots/bulk', payload, token);

        this.showBulkAddSlotModal = false;
        this.fetchDashboardData();
      } catch (error) {
        console.error('Error adding bulk slots:', error);
      }
    },
    async addRecurringSlots(slotData) {
      try {
        if (new Date(slotData.end_date) < new Date(slotData.start_date)) {
          throw new Error('Tanggal selesai harus setelah tanggal mulai');
        }
        if (slotData.start_time >= slotData.end_time) {
          throw new Error('Jam selesai harus setelah jam mulai');
        }
        if (slotData.repeat_every === 'week' && (!slotData.days || slotData.days.length === 0)) {
          throw new Error('Pilih minimal satu hari untuk pengulangan mingguan');
        }

        const token = await Cookies.get('token');
        const payload = { ...slotData };

        if (payload.repeat_every !== 'week') {
          delete payload.days;
        }

        const response = await initAPI('post', 'consultant-dashboard/slots/recurring', payload, token);

        this.showRecurringSlotModal = false;
        this.fetchDashboardData();
      } catch (error) {
        console.error('Error adding recurring slots:', error);
      }
    },
    async updateSessionStatus(id, status) {
      const token = await Cookies.get('token')
      try {
        await initAPI('put', `consultant-dashboard/sessions/${id}/status`, { status }, token)
        const sessionIndex = this.upcomingSessions.findIndex(s => s.id === id)
        if (sessionIndex !== -1) {
          this.upcomingSessions[sessionIndex].status = status
        }
        this.fetchDashboardData()
      } catch (error) {
        console.error('Error updating session status:', error)
        if (error.response && error.response.status === 401) {
          this.logout()
        }
      }
    },
    async addSpecialization() {
      if (!this.newSpecialization) {
        alert('Silakan pilih spesialisasi');
        return
      }
      const token = await Cookies.get('token')
      try {
        await initAPI('post', `consultant-dashboard/specializations`, {
          specialization_id: this.newSpecialization
        }, token)
        const response = await initAPI('get', `consultant-dashboard/specializations`, null, token)
        this.specializations = response.data.data
        this.showAddSpecializationModal = false
        this.newSpecialization = ''
      } catch (error) {
        console.error('Error adding specialization:', error)
        if (error.response && error.response.status === 401) {
          this.logout()
        } else if (error.response) {
          alert(error.response.data.message || 'Gagal menambahkan spesialisasi');
        }
      }
    },
    async removeSpecialization(id) {
      if (!confirm('Apakah Anda yakin ingin menghapus spesialisasi ini?')) {
        return
      }
      const token = await Cookies.get('token')
      try {
        await initAPI('delete', `consultant-dashboard/specializations/${id}`, null, token)
        const response = await initAPI('get', `consultant-dashboard/specializations`, null, token)
        this.specializations = response.data.data
      } catch (error) {
        console.error('Error removing specialization:', error)
        if (error.response && error.response.status === 401) {
          this.logout()
        } else if (error.response) {
          alert(error.response.data.message || 'Gagal menghapus spesialisasi');
        }
      }
    },
    formatDate(date) {
      return moment(date).format('DD MMMM YYYY [pukul] HH:mm');
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('id-ID').format(amount)
    },
    getStatusText(status) {
      const statusMap = {
        'available': 'Tersedia',
        'booked': 'Dipesan',
        'confirmed': 'Dikonfirmasi',
        'completed': 'Selesai',
        'cancelled': 'Dibatalkan',
        'pending': 'Menunggu'
      }
      return statusMap[status] || status
    },
    showSessionDetails(session) {
      this.selectedSession = session
    },
    async logout() {
      const token = await Cookies.get('token')
      try {
        await initAPI('post', 'logout', null, token)
        localStorage.clear()
        window.location.href = '/login'
      } catch (error) {
        console.error('Error logging out:', error)
        localStorage.clear()
        window.location.href = '/login'
      }
    }
  }
}
</script>

<style>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
}

* {
  transition-property: transform, opacity, background-color, border-color, color, fill, stroke, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.calendar-container .fc {
  font-family: inherit;
}

.calendar-container .fc-event {
  cursor: pointer;
  border-radius: 8px !important;
  border: none !important;
  font-weight: 500;
  font-size: 12px;
  padding: 2px 6px;
  margin: 1px 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.calendar-container .fc-event:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.calendar-container .fc-button {
  border-radius: 10px !important;
  border: none !important;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8) !important;
  font-weight: 500 !important;
  font-size: 13px !important;
  padding: 8px 16px !important;
  transition: all 0.2s ease !important;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
}

.calendar-container .fc-button:hover {
  background: linear-gradient(135deg, #1d4ed8, #1e40af) !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.calendar-container .fc-button:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3) !important;
}

.calendar-container .fc-button-active {
  background: linear-gradient(135deg, #1e40af, #1e3a8a) !important;
}

.calendar-container .fc-daygrid-day {
  transition: background-color 0.2s ease;
}

.calendar-container .fc-daygrid-day:hover {
  background-color: #f8fafc;
}

.calendar-container .fc-timegrid-slot {
  transition: background-color 0.2s ease;
  border-color: #e2e8f0 !important;
}

.calendar-container .fc-timegrid-slot:hover {
  background-color: #f8fafc;
}

.calendar-container .fc-col-header-cell {
  background-color: #f8fafc;
  font-weight: 600;
  color: #475569;
  border-color: #e2e8f0 !important;
}

.calendar-container .fc-daygrid-day-number {
  color: #374151;
  font-weight: 500;
  padding: 4px;
}

.calendar-container .fc-day-today {
  background-color: #eff6ff !important;
}

.calendar-container .fc-day-today .fc-daygrid-day-number {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
}

.calendar-container .fc-timegrid-axis {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
}

.calendar-container .fc-timegrid-slot-label {
  font-size: 12px;
  color: #6b7280;
}

.calendar-container .fc-scrollgrid {
  border-color: #e2e8f0 !important;
  border-radius: 12px;
  overflow: hidden;
}

.calendar-container .fc-scrollgrid-section>* {
  border-color: #e2e8f0 !important;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Animation for modals */
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fixed.inset-0 {
  animation: fadeIn 0.2s ease-out;
}

.inline-block.align-bottom {
  animation: slideUp 0.3s ease-out;
}

/* Responsive calendar adjustments */
@media (max-width: 768px) {
  .calendar-container .fc-toolbar {
    flex-direction: column;
    gap: 1rem;
  }

  .calendar-container .fc-toolbar-title {
    font-size: 1.25rem !important;
    margin: 0;
  }

  .calendar-container .fc-button {
    font-size: 12px !important;
    padding: 6px 12px !important;
  }

  .calendar-container .fc-event {
    font-size: 11px;
    padding: 1px 4px;
  }
}
</style>
