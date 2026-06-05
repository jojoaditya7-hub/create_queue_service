import { useState } from 'react'

export default function NMSQueueUI() {
  const [language, setLanguage] = useState<'id' | 'en'>('id')
  const [showBookingPopup, setShowBookingPopup] = useState(false)
  const [showBookingCodeInput, setShowBookingCodeInput] = useState(false)
  const [showBookingDetail, setShowBookingDetail] = useState(false)
  const [showQueueNumberPopup, setShowQueueNumberPopup] = useState(false)
  const [bookingCode, setBookingCode] = useState('')
  const [bookingCodeError, setBookingCodeError] = useState('')
  const [showBookingNotFound, setShowBookingNotFound] = useState(false)
  const [showPhoneNumberInput, setShowPhoneNumberInput] = useState(false)
  const [countryCode, setCountryCode] = useState('+62')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [, setPhoneNumberError] = useState('')
  const [showRegulerPopup, setShowRegulerPopup] = useState(false)
  const [showRegulerQrScan, setShowRegulerQrScan] = useState(false)
  const [showRegulerEngineInput, setShowRegulerEngineInput] = useState(false)
  const [regulerEngineNumber, setRegulerEngineNumber] = useState('')
  const [regulerSearchMethod, setRegulerSearchMethod] = useState<'engine' | 'plate' | null>(null)
  const [regulerPlateNumber, setRegulerPlateNumber] = useState('')
  const [regulerDriverName, setRegulerDriverName] = useState('')
  const [showRegulerSearchNotFound, setShowRegulerSearchNotFound] = useState(false)
  const [activeQueueType, setActiveQueueType] = useState<'booking' | 'reguler' | 'pitExpress'>('booking')

  const queueNumbers = {
    booking: 'B001',
    reguler: 'R001',
    pitExpress: 'P001'
  }

  const activeQueueNumber = queueNumbers[activeQueueType]

  const openRegulerBookingDetail = () => {
    setActiveQueueType('reguler')
    setShowRegulerPopup(false)
    setShowRegulerQrScan(false)
    setShowRegulerEngineInput(false)
    setRegulerSearchMethod(null)
    setShowRegulerSearchNotFound(false)
    setRegulerEngineNumber('')
    setRegulerPlateNumber('')
    setRegulerDriverName('')
    setShowBookingPopup(true)
    setShowBookingCodeInput(false)
    setShowPhoneNumberInput(false)
    setShowBookingDetail(true)
    setShowBookingNotFound(false)
    setShowQueueNumberPopup(false)
    setBookingCode('')
    setBookingCodeError('')
  }

  const translations = {
    id: {
      title: 'ANTRIAN SERVICE',
      subtitle: 'Pilih jenis antrian service yang Anda butuhkan',
      info: 'Pastikan data kendaraan dan informasi yang Anda masukkan sudah benar.',
      bookingDesc: 'Pelanggan sudah melakukan booking service sebelumnya.',
      regulerDesc: 'Pelanggan datang langsung tanpa booking service.',
      pitDesc: 'Layanan cepat untuk perawatan ringan tertentu.'
    },
    en: {
      title: 'SERVICE QUEUE',
      subtitle: 'Select the type of service queue you need',
      info: 'Make sure the vehicle data and information you entered are correct.',
      bookingDesc: 'Customers have previously booked a service appointment.',
      regulerDesc: 'Customers come directly without a service booking.',
      pitDesc: 'Quick service for specific light maintenance services.'
    }
  }

  const t = translations[language]

  const queueCounts = {
    booking: 10,
    reguler: 5,
    pit: 2
  }

  const menu = [
    {
      id: 'booking',
      title: 'BOOKING',
      icon: '📅',
      color: 'from-orange-500 to-orange-600',
      description: t.bookingDesc,
      totalQueue: queueCounts.booking
    },
    {
      id: 'reguler',
      title: 'REGULER',
      icon: '🛵',
      color: 'from-slate-100 to-slate-200',
      description: t.regulerDesc,
      totalQueue: queueCounts.reguler
    },
    {
      id: 'pit',
      title: 'PIT EXPRESS',
      icon: '⏱️',
      color: 'from-slate-100 to-slate-200',
      description: t.pitDesc,
      totalQueue: queueCounts.pit
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-10 py-6">
        <div className="flex items-center gap-3">
          <div className="text-4xl font-bold text-orange-500">NMS</div>
          <div className="text-sm text-gray-600 leading-tight">
            <div>NETWORK MANAGEMENT</div>
            <div>SYSTEM</div>
          </div>
        </div>

        <div className="bg-white rounded-full shadow-md p-1 flex items-center gap-1 border border-gray-200">
          <button
            onClick={() => setLanguage('id')}
            className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${language === 'id'
              ? 'bg-orange-500 text-white shadow-md'
              : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            ID
          </button>

          <button
            onClick={() => setLanguage('en')}
            className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${language === 'en'
              ? 'bg-orange-500 text-white shadow-md'
              : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            EN
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 -mt-10">
        <div className="text-center mb-14">
          <div className="text-7xl font-black text-orange-500 tracking-wide mb-5">
            NMS
          </div>

          <h1 className="text-5xl font-black text-gray-700 mb-4 tracking-wide">
            {t.title}
          </h1>

          <p className="text-gray-500 text-xl">
            {t.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-14 relative z-10">
          {menu.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.id === 'booking') {
                  setActiveQueueType('booking')
                  setShowBookingPopup(true)
                  setShowRegulerPopup(false)
                  setShowBookingCodeInput(false)
                  setShowPhoneNumberInput(false)
                  setShowBookingDetail(false)
                  setShowBookingNotFound(false)
                  setShowQueueNumberPopup(false)
                  setBookingCode('')
                  setBookingCodeError('')
                }

                if (item.id === 'reguler') {
                  setActiveQueueType('reguler')
                  setShowRegulerPopup(true)
                  setShowRegulerQrScan(false)
                  setShowRegulerEngineInput(false)
                  setRegulerSearchMethod(null)
                  setShowRegulerSearchNotFound(false)
                  setRegulerEngineNumber('')
                  setRegulerPlateNumber('')
                  setRegulerDriverName('')
                }

                if (item.id === 'pit') {
                  setActiveQueueType('pitExpress')
                }
              }}
              className="group relative w-[290px] h-[340px] rounded-[40px] bg-white shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:border-orange-400 hover:bg-orange-500 border border-gray-200"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-[40px] bg-orange-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

              <div className="absolute top-5 left-1/2 -translate-x-1/2 group/tooltip z-[9999]">
                <div className="px-5 py-2 rounded-full bg-orange-100 text-orange-600 font-bold text-sm shadow-sm group-hover:bg-white group-hover:text-orange-500 transition-all duration-300 cursor-help">
                  {item.title} : {item.totalQueue}
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 top-14 w-[260px] bg-gray-900 text-white text-xs rounded-xl px-4 py-3 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 shadow-2xl z-[99999] text-center leading-relaxed pointer-events-none">
                  Ambil dari data Antrian yang belum di kerjakan Mekanik

                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-900 rotate-45"></div>
                </div>
              </div>

              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div
                  className="text-8xl mb-8 transition-transform duration-300 group-hover:scale-110 text-gray-800 group-hover:text-white"
                >
                  {item.icon}
                </div>

                <div
                  className="text-3xl font-black tracking-wide mb-4 text-gray-700 group-hover:text-white"
                >
                  {item.title}
                </div>

                <p
                  className="text-sm leading-relaxed text-gray-500 group-hover:text-orange-100"
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Information */}
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg rounded-2xl px-8 py-5 max-w-3xl w-full flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center font-bold text-xl">
            i
          </div>

          <div className="text-gray-600 text-lg">
            {t.info}
          </div>
        </div>
      {/* Booking Popup */}
        {showBookingPopup && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999999] px-4">
            <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl p-10 relative animate-in fade-in zoom-in duration-300">
              <button
                onClick={() => {
                  setShowBookingPopup(false)
                  setShowBookingCodeInput(false)
                  setShowBookingDetail(false)
                  setShowBookingNotFound(false)
                  setShowQueueNumberPopup(false)
                  setBookingCode('')
                  setBookingCodeError('')
                }}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-all text-gray-500 text-xl font-bold"
              >
                ×
              </button>

              {!showBookingCodeInput && !showPhoneNumberInput && !showBookingDetail && (
                <div className="text-center mb-10">
                  <div className="text-3xl font-black text-gray-700 mb-3">
                    {language === 'id'
                      ? 'Pilih Metode Booking'
                      : 'Select Booking Method'}
                  </div>

                  <div className="text-gray-500 text-lg">
                    {language === 'id'
                      ? 'Silakan pilih metode pencarian booking service'
                      : 'Please select the booking service search method'}
                  </div>
                </div>
              )}

              {!showBookingCodeInput && !showPhoneNumberInput && !showBookingDetail ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Booking Code */}
                <div
                  onClick={() => setShowBookingCodeInput(true)}
                  className="group cursor-pointer border border-gray-200 rounded-[28px] p-8 hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-2xl"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="text-7xl mb-6 transition-all duration-300 group-hover:scale-110">
                      🎫
                    </div>

                    <div className="text-2xl font-black text-gray-700 group-hover:text-white mb-3 transition-all">
                      {language === 'id' ? 'Kode Booking' : 'Booking Code'}
                    </div>

                    <div className="text-sm text-gray-500 group-hover:text-orange-100 leading-relaxed transition-all">
                      {language === 'id'
                        ? 'Input kode booking yang dimiliki pelanggan'
                        : 'Input customer booking code'}
                    </div>
                  </div>
                </div>

                {/* Phone Number */}
                <div
                  onClick={() => {
                    setShowPhoneNumberInput(true)
                    setPhoneNumber('')
                  }}
                  className="group cursor-pointer border border-gray-200 rounded-[28px] p-8 hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-2xl">
                  <div className="flex flex-col items-center text-center">
                    <div className="text-7xl mb-6 transition-all duration-300 group-hover:scale-110">
                      📱
                    </div>

                    <div className="text-2xl font-black text-gray-700 group-hover:text-white mb-3 transition-all">
                      {language === 'id' ? 'No. Handphone' : 'Phone Number'}
                    </div>

                    <div className="text-sm text-gray-500 group-hover:text-orange-100 leading-relaxed transition-all">
                      {language === 'id'
                        ? 'Cari booking berdasarkan nomor handphone pelanggan'
                        : 'Search booking by customer phone number'}
                    </div>
                  </div>
                </div>
              </div>
              ) : showPhoneNumberInput ? (
              <div className="max-w-xl mx-auto w-full">
                <div className="text-center mb-8">
                  <div className="text-7xl mb-5">📱</div>

                  <div className="text-3xl font-black text-gray-700 mb-3">
                    {language === 'id' ? 'Input No. Handphone' : 'Input Phone Number'}
                  </div>

                  <div className="text-gray-500 text-lg leading-relaxed">
                    {language === 'id'
                      ? 'Masukkan nomor handphone pelanggan'
                      : 'Enter customer phone number'}
                  </div>
                </div>

                <div className="flex gap-4 mb-8">
                  <div className="relative w-[180px]">
                    <select
                      value={countryCode}
                      onChange={(e) => {
                        setCountryCode(e.target.value)
                        setPhoneNumber('')
                        setPhoneNumberError('')
                      }}
                      className="w-full h-16 rounded-2xl border border-gray-300 px-4 text-lg font-bold focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-500 appearance-none bg-white"
                    >
                      <option value="+62">🇮🇩 +62</option>
                      <option value="+670">🇹🇱 +670</option>
                    </select>

                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-sm">
                      ▼
                    </div>
                  </div>

                  <input
                    value={phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '')

                      if (countryCode === '+62' && value.startsWith('0')) {
                        return
                      }

                      setPhoneNumber(value)
                      setPhoneNumberError('')
                    }}
                    type="text"
                    placeholder="81234567890"
                    className="flex-1 h-16 rounded-2xl border border-gray-300 px-6 text-xl font-bold focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all"
                  />
                </div>

                {countryCode === '+62' && (
                  <div className="mb-6 text-center">
                    <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-500 px-5 py-3 rounded-2xl font-semibold text-sm">
                      ℹ️ {language === 'id'
                        ? 'Awal inputan no. handphone tidak perlu menggunakan angka 0'
                        : 'Phone number should not start with 0'}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-center gap-5">
                  <button
                    onClick={() => {
                      setShowPhoneNumberInput(false)
                      setPhoneNumber('')
                    }}
                    className="px-8 py-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-all"
                  >
                    {language === 'id' ? 'Kembali' : 'Back'}
                  </button>

                  <button
                    onClick={() => {
                      if (
                        countryCode === '+62' &&
                        phoneNumber === '81703872436'
                      ) {
                        setShowPhoneNumberInput(false)
                        setShowBookingDetail(true)
                        return
                      }

                      setShowBookingNotFound(true)
                    }}
                    className="px-8 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg transition-all"
                  >
                    {language === 'id' ? 'Cari Booking' : 'Search Booking'}
                  </button>
                </div>
              </div>
            ) : !showBookingDetail ? (
              <div className="max-w-xl mx-auto">
                <div className="text-center mb-8">
                  <div className="text-7xl mb-5">
                    🎫
                  </div>

                  <div className="text-3xl font-black text-gray-700 mb-3">
                    {language === 'id' ? 'Input Kode Booking' : 'Input Booking Code'}
                  </div>

                  <div className="text-gray-500 text-lg leading-relaxed">
                    {language === 'id'
                      ? 'Input 3 digit kode booking Brompit'
                      : 'Input 3 digit Brompit booking code'}
                  </div>
                </div>

                <div className="mb-8">
                  <input
                    value={bookingCode}
                    onChange={(e) => {
                      setBookingCode(e.target.value.toUpperCase())
                      setBookingCodeError('')
                    }}
                    type="text"
                    maxLength={3}
                    placeholder={language === 'id' ? 'Contoh: A12' : 'Example: A12'}
                    className="w-full h-16 rounded-2xl border border-gray-300 px-6 text-2xl font-bold tracking-[10px] text-center focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all uppercase"
                  />
                </div>

                {bookingCodeError && (
                  <div className="mb-6 text-center">
                    <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-500 px-5 py-3 rounded-2xl font-semibold text-sm">
                      ⚠️ {bookingCodeError}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-center gap-5">
                  <button
                    onClick={() => {
                      setShowBookingDetail(false)
                      setShowBookingCodeInput(false)
                      setBookingCode('')
                      setBookingCodeError('')
                      setShowBookingNotFound(false)
                    }}
                    className="px-8 py-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-all"
                  >
                    {language === 'id' ? 'Kembali' : 'Back'}
                  </button>

                  <button
                    onClick={() => {
                      if (!bookingCode.trim()) {
                        setBookingCodeError(
                          language === 'id'
                            ? 'Input kode booking terlebih dahulu'
                            : 'Please input booking code first'
                        )
                        return
                      }

                      if (bookingCode.trim().length < 3) {
                        setBookingCodeError(
                          language === 'id'
                            ? 'Input kode booking 3 digit, tidak boleh kurang'
                            : 'Booking code must be 3 digits'
                        )
                        return
                      }

                      if (bookingCode.toUpperCase() === 'A12') {
                        setShowBookingDetail(true)
                        return
                      }

                      if (bookingCode.toUpperCase() === 'A14') {
                        setShowBookingNotFound(true)
                        return
                      }

                      setShowBookingNotFound(true)
                    }}
                    className="px-8 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg transition-all"
                  >
                    {language === 'id' ? 'Cari Booking' : 'Search Booking'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-10">
                  <div className="text-7xl mb-5">
                    📋
                  </div>

                  <div className="text-3xl font-black text-gray-700 mb-3">
                    {language === 'id'
                      ? 'Detail Booking Service'
                      : 'Booking Service Detail'}
                  </div>

                  <div className="text-gray-500 text-lg">
                    {language === 'id'
                      ? 'Berikut detail data booking service pelanggan'
                      : 'Here are the customer booking service details'}
                  </div>
                </div>

                <div className="space-y-5 mb-10">
                  <div className={activeQueueType === 'booking' ? 'grid grid-cols-2 gap-5' : 'grid grid-cols-1 gap-5'}>
                    {activeQueueType === 'booking' && (
                      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                        <div className="text-sm text-gray-500 mb-2">
                          {language === 'id' ? 'Kode Booking' : 'Booking Code'}
                        </div>
                        <div className="text-xl font-black text-gray-700">
                          A12
                        </div>
                      </div>
                    )}

                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                      <div className="text-sm text-gray-500 mb-2">
                        {language === 'id' ? 'No. Mesin' : 'Engine Number'}
                      </div>
                      <div className="text-xl font-black text-gray-700">
                        JM81E1234567
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                    <div className="text-sm text-gray-500 mb-2">
                      {language === 'id' ? 'Nama Motor' : 'Motorcycle Name'}
                    </div>
                    <div className="text-xl font-black text-gray-700">
                      Honda Vario 160 CBS
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                    <div className="text-sm text-gray-500 mb-2">
                      {language === 'id' ? 'Nama Konsumen' : 'Customer Name'}
                    </div>
                    <div className="text-xl font-black text-gray-700">
                      Budi Santoso
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                    <div className="text-sm text-gray-500 mb-2">
                      {language === 'id' ? 'No. Handphone' : 'Phone Number'}
                    </div>
                    <div className="text-xl font-black text-gray-700">
                      081234567890
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-5">
                  <button
                    onClick={() => {
                      setShowBookingDetail(false)
                      setBookingCode('')
                      setBookingCodeError('')

                      if (activeQueueType === 'reguler') {
                        setShowBookingPopup(false)
                      }
                    }}
                    className="px-8 py-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-all"
                  >
                    {language === 'id' ? 'Kembali' : 'Back'}
                  </button>

                  <button
                    onClick={() => setShowQueueNumberPopup(true)}
                    className="px-8 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg transition-all"
                  >
                    {language === 'id'
                      ? 'Ambil Nomor Antrian'
                      : 'Take Queue Number'}
                  </button>
                </div>
              </div>
                        )}

            {showBookingNotFound && (
              <div className="absolute inset-0 bg-white rounded-[32px] flex items-center justify-center p-10 z-[9999999]">
                <div className="w-full max-w-xl text-center">
                  <div className="text-8xl mb-6">
                    ⚠️
                  </div>

                  <div className="text-3xl font-black text-gray-700 mb-4">
                    {language === 'id'
                      ? 'Data Booking Tidak Ditemukan'
                      : 'Booking Data Not Found'}
                  </div>

                  

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => {
                        setShowBookingNotFound(false)
                      
                        // Tutup semua popup lain
                        setShowPhoneNumberInput(false)
                        setShowBookingDetail(false)
                        setShowQueueNumberPopup(false)
                      
                        // Reset input phone
                        setPhoneNumber('')
                        setPhoneNumberError('')
                      
                        // Reset input booking
                        setBookingCode('')
                        setBookingCodeError('')
                      
                        // Buka popup Input Kode Booking
                        setShowBookingCodeInput(true)
                      }}
                      className="px-5 py-5 rounded-2xl bg-orange-100 hover:bg-orange-500 text-orange-600 hover:text-white font-bold transition-all"
                    >
                      {language === 'id'
                        ? 'Input Kode Booking'
                        : 'Input Booking Code'}
                    </button>

                    <button
                      onClick={() => {
                        setShowBookingNotFound(false)
                        setShowBookingCodeInput(false)
                        setShowPhoneNumberInput(true)
                        setPhoneNumber('')
                        setBookingCode('')
                        setBookingCodeError('')
                      }}
                      className="px-5 py-5 rounded-2xl bg-orange-100 hover:bg-orange-500 text-orange-600 hover:text-white font-bold transition-all"
                    >
                      {language === 'id'
                        ? 'Input No. Handphone'
                        : 'Input Phone Number'}
                    </button>

                    <button
                      onClick={() => {
                        setShowBookingNotFound(false)
                        setShowBookingPopup(false)
                        setShowBookingCodeInput(false)
                        setBookingCode('')
                        setBookingCodeError('')
                      }}
                      className="px-5 py-5 rounded-2xl bg-gray-100 hover:bg-orange-500 hover:text-white text-gray-700 font-bold transition-all"
                    >
                      Antrian Reguler
                    </button>
                  </div>
                </div>
              </div>
            )}

            {showQueueNumberPopup && (
              <div className="absolute inset-0 bg-white rounded-[32px] flex items-center justify-center p-10 z-[9999999]">
                <div className="w-full max-w-xl text-center">
                  <div className="text-8xl mb-6">
                    🎟️
                  </div>

                  <div className="text-3xl font-black text-gray-700 mb-3">
                    {language === 'id'
                      ? 'Nomor Antrian Service'
                      : 'Service Queue Number'}
                  </div>

                  <div className="text-gray-500 text-lg mb-10">
                    {language === 'id'
                      ? 'Silakan tunggu hingga nomor antrian dipanggil'
                      : 'Please wait until your queue number is called'}
                  </div>

                  <div className="bg-orange-500 rounded-[40px] py-10 px-8 shadow-2xl mb-10">
                    <div className="text-white text-8xl font-black tracking-[8px]">
                      {activeQueueNumber}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5 mb-10 text-left">
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                      <div className="text-sm text-gray-500 mb-2">
                        {language === 'id' ? 'Nama Konsumen' : 'Customer Name'}
                      </div>
                      <div className="text-xl font-black text-gray-700">
                        Budi Santoso
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                      <div className="text-sm text-gray-500 mb-2">
                        {language === 'id' ? 'Nama Motor' : 'Motorcycle Name'}
                      </div>
                      <div className="text-xl font-black text-gray-700">
                        Honda Vario 160 CBS
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => {
                        setShowQueueNumberPopup(false)
                        setShowBookingPopup(false)
                        setShowBookingCodeInput(false)
                        setShowBookingDetail(false)
                        setShowBookingNotFound(false)
                        setRegulerSearchMethod(null)
                        setShowRegulerSearchNotFound(false)
                        setRegulerEngineNumber('')
                        setRegulerPlateNumber('')
                        setRegulerDriverName('')
                        setBookingCode('')
                        setBookingCodeError('')
                      }}
                      className="px-8 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg transition-all"
                    >
                      {language === 'id' ? 'Selesai' : 'Finish'}
                    </button>
                  </div>
                </div>
              </div>
            )}
            </div>
          </div>
        )}

        {/* Reguler Popup */}
        {showRegulerPopup && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999999] px-4">
            <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl p-10 relative animate-in fade-in zoom-in duration-300">
              <button
                onClick={() => {
                  setShowRegulerPopup(false)
                  setShowRegulerQrScan(false)
                  setShowRegulerEngineInput(false)
                  setRegulerSearchMethod(null)
                  setShowRegulerSearchNotFound(false)
                  setRegulerEngineNumber('')
                  setRegulerPlateNumber('')
                  setRegulerDriverName('')
                }}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-all text-gray-500 text-xl font-bold"
              >
                ×
              </button>

              {!showRegulerQrScan && !showRegulerEngineInput ? (
                <>
                  <div className="text-center mb-10">
                    <div className="text-3xl font-black text-gray-700 mb-3">
                      Pilih Metode Input Antrian Reguler
                    </div>

                    <div className="text-gray-500 text-lg">
                      Silakan pilih metode input antrian reguler
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div
                      onClick={() => setShowRegulerQrScan(true)}
                      className="group cursor-pointer border border-gray-200 rounded-[28px] p-8 hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-2xl"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="text-7xl mb-6 transition-all duration-300 group-hover:scale-110">
                          📷
                        </div>

                        <div className="text-2xl font-black text-gray-700 group-hover:text-white mb-3 transition-all">
                          QR Code Unit
                        </div>

                        <div className="text-sm text-gray-500 group-hover:text-orange-100 leading-relaxed transition-all">
                          Scan QR code unit kendaraan pelanggan
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => {
                        setShowRegulerEngineInput(true)
                        setRegulerSearchMethod(null)
                        setShowRegulerSearchNotFound(false)
                        setRegulerEngineNumber('')
                        setRegulerPlateNumber('')
                        setRegulerDriverName('')
                      }}
                      className="group cursor-pointer border border-gray-200 rounded-[28px] p-8 hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-2xl"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="text-7xl mb-6 transition-all duration-300 group-hover:scale-110">
                          🔢
                        </div>

                        <div className="text-2xl font-black text-gray-700 group-hover:text-white mb-3 transition-all">
                          No. Mesin / No. Polisi
                        </div>

                        <div className="text-sm text-gray-500 group-hover:text-orange-100 leading-relaxed transition-all">
                          Input nomor mesin atau nomor polisi kendaraan pelanggan
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : showRegulerQrScan ? (
                <div className="max-w-xl mx-auto w-full">
                  <div className="text-center mb-8">
                    <div className="text-7xl mb-5">📷</div>

                    <div className="text-3xl font-black text-gray-700 mb-3">
                      Scan QR Unit
                    </div>

                    <div className="text-gray-500 text-lg leading-relaxed">
                      Arahkan kamera ke QR code unit kendaraan
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-[28px] p-10 mb-8 text-center">
                    <div className="text-8xl mb-4">▣</div>
                    <div className="text-gray-500 font-semibold mb-6">
                      Area Scan QR Unit
                    </div>
                    <button
                      onClick={openRegulerBookingDetail}
                      className="px-8 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg transition-all"
                    >
                      Scan QR Unit
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-5">
                    <button
                      onClick={() => setShowRegulerQrScan(false)}
                      className="px-8 py-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-all"
                    >
                      Kembali
                    </button>
                  </div>
                </div>
              ) : regulerSearchMethod === null ? (
                <div className="max-w-xl mx-auto w-full">
                  <div className="text-center mb-10">
                    <div className="text-7xl mb-5">🔎</div>

                    <div className="text-3xl font-black text-gray-700 mb-3">
                      Pilih Metode Pencarian Kendaraan
                    </div>

                    <div className="text-gray-500 text-lg leading-relaxed">
                      Silakan pilih metode pencarian data kendaraan pelanggan
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div
                      onClick={() => {
                        setRegulerSearchMethod('engine')
                        setShowRegulerSearchNotFound(false)
                        setRegulerEngineNumber('')
                        setRegulerDriverName('')
                      }}
                      className="group cursor-pointer border border-gray-200 rounded-[28px] p-8 hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-2xl"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="text-7xl mb-6 transition-all duration-300 group-hover:scale-110">
                          🔢
                        </div>

                        <div className="text-2xl font-black text-gray-700 group-hover:text-white mb-3 transition-all">
                          Nomor Mesin
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => {
                        setRegulerSearchMethod('plate')
                        setShowRegulerSearchNotFound(false)
                        setRegulerPlateNumber('')
                        setRegulerDriverName('')
                      }}
                      className="group cursor-pointer border border-gray-200 rounded-[28px] p-8 hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-2xl"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="text-7xl mb-6 transition-all duration-300 group-hover:scale-110">
                          🪪
                        </div>

                        <div className="text-2xl font-black text-gray-700 group-hover:text-white mb-3 transition-all">
                          Nomor Polisi
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-5">
                    <button
                      onClick={() => {
                        setShowRegulerEngineInput(false)
                        setRegulerSearchMethod(null)
                      }}
                      className="px-8 py-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-all"
                    >
                      Kembali
                    </button>
                  </div>
                </div>
              ) : (
                <div className="max-w-xl mx-auto w-full">
                  <div className="text-center mb-8">
                    <div className="text-7xl mb-5">{regulerSearchMethod === 'engine' ? '🔢' : '🪪'}</div>

                    <div className="text-3xl font-black text-gray-700 mb-3">
                      {regulerSearchMethod === 'engine' ? 'Input Nomor Mesin' : 'Input Nomor Polisi'}
                    </div>

                    <div className="text-gray-500 text-lg leading-relaxed">
                      {regulerSearchMethod === 'engine'
                        ? 'Masukkan nomor mesin kendaraan pelanggan.'
                        : 'Masukkan nomor polisi kendaraan pelanggan.'}
                    </div>
                  </div>

                  <div className="mb-8">
                    <input
                      value={regulerSearchMethod === 'engine' ? regulerEngineNumber : regulerPlateNumber}
                      onChange={(e) => {
                        const value = e.target.value.toUpperCase()

                        if (regulerSearchMethod === 'engine') {
                          setRegulerEngineNumber(value)
                        } else {
                          setRegulerPlateNumber(value.replace(/\s/g, ''))
                        }

                        setShowRegulerSearchNotFound(false)
                        setRegulerDriverName('')
                      }}
                      type="text"
                      maxLength={regulerSearchMethod === 'engine' ? 15 : undefined}
                      placeholder={regulerSearchMethod === 'engine' ? 'CONTOH : JM81E1234567' : 'CONTOH : L7827UI'}
                      className="w-full h-16 rounded-2xl border border-gray-300 px-6 text-2xl font-bold tracking-[4px] text-center focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all uppercase"
                    />
                  </div>

                  {regulerSearchMethod === 'plate' && (
                    <div className="mb-6 text-center">
                      <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-500 px-5 py-3 rounded-2xl font-semibold text-sm">
                        ℹ️ Data yang diinput harus tanpa spasi
                      </div>
                    </div>
                  )}

                  {showRegulerSearchNotFound && (
                    <div className="mb-8">
                      <div className="mb-5 text-center">
                        <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-500 px-5 py-3 rounded-2xl font-semibold text-sm">
                          ⚠️ Data tidak ditemukan
                        </div>
                      </div>

                      <label className="block text-sm text-gray-500 mb-2 font-semibold">
                        Nama Pembawa
                      </label>
                      <input
                        value={regulerDriverName}
                        onChange={(e) => setRegulerDriverName(e.target.value)}
                        type="text"
                        placeholder="Masukkan nama pembawa kendaraan"
                        className="w-full h-16 rounded-2xl border border-gray-300 px-6 text-xl font-bold focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-5">
                    <button
                      onClick={() => {
                        setRegulerSearchMethod(null)
                        setShowRegulerSearchNotFound(false)
                        setRegulerEngineNumber('')
                        setRegulerPlateNumber('')
                        setRegulerDriverName('')
                      }}
                      className="px-8 py-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-all"
                    >
                      Kembali
                    </button>

                    {showRegulerSearchNotFound && regulerDriverName.trim() ? (
                      <button
                        onClick={openRegulerBookingDetail}
                        className="px-8 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg transition-all"
                      >
                        Lanjutkan
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          const isEngineFound = regulerSearchMethod === 'engine' && regulerEngineNumber === 'JM81E1234567'
                          const isPlateFound = regulerSearchMethod === 'plate' && regulerPlateNumber === 'L7827UI'

                          if (isEngineFound || isPlateFound) {
                            openRegulerBookingDetail()
                            return
                          }

                          setShowRegulerSearchNotFound(true)
                        }}
                        className="px-8 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg transition-all"
                      >
                        Cari Data
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="px-10 py-6 flex items-center justify-between text-gray-400 text-sm">
        <div>© 2026 New Generation NMS. All rights reserved.</div>
        <div>v1.0.0</div>
      </footer>
    </div>
  )
}
