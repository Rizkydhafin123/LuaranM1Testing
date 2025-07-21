"use client"
import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { MenuIcon, ArrowDown, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { ImageWithBlur } from "@/components/image-with-blur" // Import ImageWithBlur component

interface Report {
  title: string
  subtitle: string
  image: string
  description?: string
}

interface Member {
  name: string
  faculty: string
  major: string
  nim: string
  image: string
}

interface Activity {
  title: string
  description: string
  type: "image" | "video"
  src: string
  thumbnail?: string // Added for video thumbnails
}

export default function Component() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<Activity | null>(null) // New state for selected video
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false) // New state for video dialog
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * index,
      },
    }),
  }

  const reports: Report[] = [
    {
      title: "Laporan Pendidikan",
      subtitle: "Edukasi & Literasi",
      image: "/images/reports/student-with-document.jpeg",
      description:
        "Kegiatan belajar mengajar di desa, termasuk bimbingan belajar, pelatihan komputer dasar, dan workshop literasi untuk anak-anak dan remaja.",
    },
    {
      title: "Laporan Ekonomi",
      subtitle: "Pendampingan UMKM",
      image: "/images/reports/group-discussion.jpeg",
      description:
        "Pendampingan UMKM lokal dalam pemasaran digital, manajemen keuangan sederhana, dan inovasi produk untuk meningkatkan daya saing.",
    },
    {
      title: "Laporan Lingkungan",
      subtitle: "Kebersihan & Penghijauan",
      image: "/images/reports/large-group.jpeg",
      description:
        "Program kebersihan lingkungan, pengelolaan sampah, serta kegiatan penghijauan dan penanaman pohon di area publik desa.",
    },
    {
      title: "Laporan Kesehatan",
      subtitle: "Penyuluhan & Sanitasi",
      image: "/images/reports/health-checkup.jpeg",
      description:
        "Penyuluhan kesehatan masyarakat, pemeriksaan kesehatan gratis, dan edukasi tentang pentingnya sanitasi dan kebersihan diri.",
    },
    {
      title: "Laporan Sosial",
      subtitle: "Kegiatan Komunitas",
      image: "/images/reports/group-discussion.jpeg", // Using a duplicate for demonstration
      description:
        "Mengadakan berbagai kegiatan sosial dan komunitas, seperti kerja bakti, festival desa, dan program bantuan sosial untuk warga yang membutuhkan.",
    },
  ]

  const umkmPreviewImages = [
    { src: "/images/umkm-previews/form-pendaftaran.png", alt: "Form Pendaftaran UMKM" },
    { src: "/images/umkm-previews/laporan-statistik.png", alt: "Laporan & Statistik UMKM" },
    { src: "/images/umkm-previews/kelola-data.png", alt: "Kelola Data UMKM" },
    { src: "/images/umkm-dashboard-preview.png", alt: "Dashboard Sistem UMKM" },
  ]

  const members: Member[] = [
    {
      name: "GERTRUDIS RADITYA",
      faculty: "Fakultas Hukum",
      major: "S1 - Hukum",
      nim: "11000122190232",
      image: "/images/members/gertrudis-raditya.png",
    },
    {
      name: "SINGGIH ABIYOGA",
      faculty: "Fakultas Sains dan Matematika",
      major: "S1 - Matematika",
      nim: "24010122140121",
      image: "/images/members/singgih-abiyoga.png",
    },
    {
      name: "MUHAMMAD RAMA",
      faculty: "Fakultas Sains dan Matematika",
      major: "S1 - Statistika",
      nim: "24050122140144",
      image: "/images/members/muhammad-rama.png",
    },
    {
      name: "SITI NUR LAELA",
      faculty: "Fakultas Ekonomika dan Bisnis",
      major: "S1 - Manajemen",
      nim: "12010122130172",
      image: "/images/members/siti-nur-laela.png",
    },
    {
      name: "FELICITAS VANIA",
      faculty: "Fakultas Hukum",
      major: "S1 - Hukum",
      nim: "11000122140516",
      image: "/images/members/felicitas-vania.png",
    },
    {
      name: "ANNISA WAHYU SAFITRI",
      faculty: "Fakultas Ilmu Sosial dan Ilmu Politik",
      major: "S1 - Administrasi Publik",
      nim: "14020122140196",
      image: "/images/members/annisa-wahyu-safitri.png",
    },
    {
      name: "ALYA JASMIN RIANSYA",
      faculty: "Fakultas Psikologi",
      major: "S1 - Psikologi",
      nim: "15000122140336",
      image: "/images/members/alya-jasmin-riansya.png",
    },
    {
      name: "RIZKY DHAFIN",
      faculty: "Fakultas Teknik",
      major: "S1 - Teknik Komputer",
      nim: "21120122120027",
      image: "/images/members/rizky-dhafin.png",
    },
    {
      name: "TIARA ADINDA",
      faculty: "Fakultas Sains dan Matematika",
      major: "S1 - Biologi",
      nim: "24020122140197",
      image: "/images/members/tiara-adinda.png",
    },
  ]

  const umkmSocializationActivities: Activity[] = [
    {
      title: "Sosialisasi Program UMKM",
      description: "Kegiatan sosialisasi program pemberdayaan UMKM kepada ibu-ibu RT 03 RW 01, Kelurahan Plamongsari.",
      type: "image",
      src: "/images/activities/sosialisasi-umkm-1.jpeg",
    },
    {
      title: "Diskusi dan Pelatihan Manajemen",
      description: "Sesi diskusi interaktif dan pelatihan dasar mengenai pemasaran digital dan manajemen usaha.",
      type: "image",
      src: "/images/activities/sosialisasi-umkm-5.jpeg",
    },
    {
      title: "Interaksi Peserta & Bimbingan",
      description:
        "Momen interaksi antara mahasiswa dan peserta, menjawab pertanyaan dan memberikan bimbingan personal.",
      type: "image",
      src: "/images/activities/sosialisasi-umkm-3.jpeg",
    },
    {
      title: "Foto Bersama Kegiatan",
      description: "Sesi foto bersama dengan peserta dan tim KKNT setelah kegiatan sosialisasi selesai.",
      type: "image",
      src: "/images/activities/sosialisasi-umkm-7.jpeg",
    },
  ]

  const umkmDigitalAndBookkeepingActivities: Activity[] = [
    {
      title: "Kegiatan Diskusi Pendataan",
      description: "Diskusi awal mengenai kebutuhan dan proses pendataan digital UMKM.",
      type: "image",
      src: "/images/activities/discussion-with-locals-1.jpeg",
    },
    {
      title: "Sesi Diskusi Kelompok",
      description: "Sesi diskusi kelompok untuk merancang sistem pendataan yang efektif.",
      type: "image",
      src: "/images/activities/group-discussion-session-1.jpeg",
    },
    {
      title: "Penjelasan Sistem Digital",
      description: "Mahasiswa menjelaskan cara kerja sistem pendataan digital kepada pelaku UMKM.",
      type: "image",
      src: "/images/activities/student-explaining-1.jpeg",
    },
    {
      title: "Demonstrasi Aplikasi Digital",
      description: "Demonstrasi langsung penggunaan aplikasi atau platform pendataan digital.",
      type: "image",
      src: "/images/activities/student-showing-digital-example-1.jpeg",
    },
    {
      title: "Diskusi Produk UMKM",
      description: "Diskusi mengenai pengembangan dan pemasaran produk-produk UMKM lokal.",
      type: "image",
      src: "/images/activities/umkm-product-discussion-1.jpeg",
    },
    {
      title: "Foto Bersama Tim & Warga",
      description: "Foto bersama tim KKNT dengan warga dan pelaku UMKM.",
      type: "image",
      src: "/images/activities/group-photo-1.jpeg",
    },
    {
      title: "Foto Penutup Kegiatan",
      description: "Foto bersama sebagai penutup rangkaian kegiatan pemberdayaan UMKM.",
      type: "image",
      src: "/images/activities/group-photo-2.jpeg",
    },
  ]

  const umkmVideoActivities: Activity[] = [
    {
      title: "Diskusi Pendataan UMKM Digital",
      description: "Diskusi mendalam mengenai sistem pendataan UMKM berbasis digital dan manfaatnya.",
      type: "video",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-07-16%20at%2011.00.24_649982be-Px4uuxq60EH2op8bks1uEaWlnzO5Qv.mp4",
      thumbnail: "/images/activities/group-discussion-session-1.jpeg", // Using an existing image as thumbnail
    },
    {
      title: "Edukasi Pembukuan Digital",
      description: "Edukasi tentang pembukuan keuangan secara digital untuk UMKM.",
      type: "video",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-07-16%20at%2011.00.28_dd6d9999-0Gn1smccLWSKlyMVUkMP3QWGz2rWlA.mp4",
      thumbnail: "/images/activities/student-explaining-1.jpeg", // Using an existing image as thumbnail
    },
    {
      title: "Video Diskusi UMKM",
      description: "Video kegiatan diskusi pendataan UMKM (template).",
      type: "video",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-07-16%20at%2011.07.43_7865fff0-bRgQOPhT4zmRamCTTVrOI2ZEEoy9ZT.mp4",
      thumbnail: "/images/activities/discussion-with-locals-1.jpeg", // Using an existing image as thumbnail
    },
    {
      title: "Video Edukasi Pembukuan",
      description: "Video edukasi pembukuan digital (template).",
      type: "video",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-07-16%20at%2011.07.43_3336aff3-DFCPKQxcFkBrtI2radd8oBPht9S6AF.mp4",
      thumbnail: "/images/activities/umkm-product-discussion-1.jpeg", // Using an existing image as thumbnail
    },
    {
      title: "Video Interaksi Kegiatan",
      description: "Video interaksi dan diskusi kegiatan (template).",
      type: "video",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-07-16%20at%2011.07.43_72dfc433-lFchKfLnRPCggQ28ZRSlhAzwDNujDG.mp4",
      thumbnail: "/images/activities/group-photo-1.jpeg", // Using an existing image as thumbnail
    },
  ]

  const handleCardClick = (report: Report) => {
    setSelectedReport(report)
    setIsDialogOpen(true)
  }

  const handleVideoCardClick = (activity: Activity) => {
    setSelectedVideo(activity)
    setIsVideoDialogOpen(true)
  }

  const scrollCarousel = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const cardWidth = 256 + 24 // Card width (w-64 = 256px) + gap (space-x-6 = 24px)
      let newIndex = currentIndex

      if (direction === "right") {
        newIndex = (currentIndex + 1) % reports.length
      } else {
        newIndex = (currentIndex - 1 + reports.length) % reports.length
      }
      setCurrentIndex(newIndex)
      scrollContainerRef.current.scrollTo({
        left: newIndex * cardWidth,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white py-4 px-6 md:px-10 flex items-center justify-between shadow-sm fixed w-full z-50 top-0 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-gray-800 hover:text-[#e63946] font-bold py-2 px-4 rounded-md">
            KKNT Kelompok 5
          </Button>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#beranda" className="text-gray-700 hover:text-[#e63946] font-medium" prefetch={false}>
            Beranda
          </Link>
          <Link href="#laporan-kegiatan" className="text-gray-700 hover:text-[#e63946] font-medium" prefetch={false}>
            Laporan Kegiatan
          </Link>
          <Link href="#profil-kelompok" className="text-gray-700 hover:text-[#e63946] font-medium" prefetch={false}>
            Profil Kelompok
          </Link>
          <Link href="#pelaksanaan-multi-1" className="text-gray-700 hover:text-[#e63946] font-medium" prefetch={false}>
            Pelaksanaan Multi 1
          </Link>
          <Link href="#anggota-kelompok" className="text-gray-700 hover:text-[#e63946] font-medium" prefetch={false}>
            Anggota Kelompok
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-4 py-6">
              <Link href="#beranda" className="text-gray-800 hover:text-[#e63946] font-medium" prefetch={false}>
                Beranda
              </Link>
              <Link
                href="#laporan-kegiatan"
                className="text-gray-800 hover:text-[#e63946] font-medium"
                prefetch={false}
              >
                Laporan Kegiatan
              </Link>
              <Link href="#profil-kelompok" className="text-gray-800 hover:text-[#e63946] font-medium" prefetch={false}>
                Profil Kelompok
              </Link>
              <Link
                href="#pelaksanaan-multi-1"
                className="text-gray-800 hover:text-[#e63946] font-medium"
                prefetch={false}
              >
                Pelaksanaan Multi 1
              </Link>
              <Link
                href="#anggota-kelompok"
                className="text-gray-800 hover:text-[#e63946] font-medium"
                prefetch={false}
              >
                Anggota Kelompok
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Hero Section */}
      <main className="relative flex-1 overflow-hidden pt-[72px]" id="beranda">
        <section
          className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 md:px-10"
          style={{ backgroundImage: `url('/images/kknt-banner.png')` }}
        >
          <span className="sr-only">
            KKNT-105 Kelompok 5: Peningkatan Kapasitas Pemasaran Dan Inovasi Akses Terhadap UMKM Melalui Teknologi
            Digital Dan Bahasa Di Kota Semarang
          </span>
        </section>

        {/* Laporan Kegiatan Section */}
        <section className="relative z-20 -mt-20 md:-mt-32 lg:-mt-40 px-4 md:px-10 pb-16" id="laporan-kegiatan">
          <div className="relative max-w-6xl mx-auto">
            <div
              ref={scrollContainerRef}
              className="flex space-x-6 overflow-x-auto overflow-y-hidden pb-4 scrollbar-hide"
            >
              {reports.map((report, index) => (
                <motion.div
                  key={index}
                  variants={fadeInAnimationVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={index}
                  className="flex-none w-64"
                >
                  <Card
                    className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer hover:scale-105"
                    onClick={() => handleCardClick(report)}
                  >
                    <CardContent className="p-0 relative h-96">
                      <ImageWithBlur
                        src={report.image || "/placeholder.svg"}
                        alt={`Thumbnail ${report.title}`}
                        width={300}
                        height={400}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4 text-white">
                        <h3 className="font-bold text-xl mb-1">{report.title}</h3>
                        <p className="text-sm opacity-80">{report.subtitle}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              <motion.div
                variants={fadeInAnimationVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={reports.length}
                className="flex-none w-64"
              >
                <Link
                  href="#pelaksanaan-multi-1"
                  className="block h-full"
                  style={{ textDecoration: "none" }}
                  prefetch={false}
                >
                  <Card className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-center p-6 h-full">
                    <CardContent className="flex flex-col items-center justify-center h-full text-white">
                      <h3 className="text-2xl font-bold mb-2">Lihat Semua Laporan</h3>
                      <ArrowDown className="h-8 w-8" />
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            </div>
            {/* Navigation Arrows */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow-md z-10 hidden md:flex"
              onClick={() => scrollCarousel("left")}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow-md z-10 hidden md:flex"
              onClick={() => scrollCarousel("right")}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </section>

        {/* Profil Kelompok Section (formerly About Section) */}
        <section className="py-20 px-4 md:px-10 bg-gradient-to-br from-slate-50 to-blue-50" id="profil-kelompok">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Profil KKNT Kelompok 5</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Kami adalah kelompok mahasiswa yang berdedikasi dalam program Kuliah Kerja Nyata Tematik (KKNT) dengan
                fokus pada pemberdayaan masyarakat dan pengembangan potensi desa.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Melalui berbagai program dan kegiatan, kami berupaya memberikan kontribusi nyata dalam bidang
                pendidikan, ekonomi, lingkungan, dan kesehatan untuk menciptakan perubahan positif di desa mitra kami.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="/images/kknt-group-profile.jpeg"
                alt="Foto Kelompok KKNT 5"
                width={600}
                height={400}
                className="rounded-xl shadow-lg w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Pelaksanaan Multi 1 Section (formerly Tentang KKNT Section) */}
        <section className="py-20 px-4 md:px-10 bg-gradient-to-br from-blue-50 to-slate-100" id="pelaksanaan-multi-1">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h2
              className="text-4xl font-bold text-gray-900 mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Pelaksanaan Multi 1: Pemberdayaan UMKM Desa melalui Teknologi dan Inovasi Digital
            </motion.h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-12 text-center max-w-3xl mx-auto">
              Program kerja Multi 1 kami berfokus pada peningkatan kapasitas UMKM di desa melalui pemanfaatan teknologi
              digital dan inovasi. Kegiatan yang telah kami laksanakan meliputi sosialisasi, pelatihan, dan pendampingan
              langsung kepada pelaku UMKM, khususnya ibu-ibu di RT 03 RW 01 Kelurahan Plamongsari, untuk membantu mereka
              mengembangkan usaha di era digital.
            </p>

            {/* Sistem Pendataan UMKM Subsection */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Sistem Pendataan UMKM Digital</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-left"
                >
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Kami telah mengembangkan sistem pendataan UMKM berbasis website untuk memudahkan pengelolaan data
                    usaha mikro, kecil, dan menengah di wilayah kami. Sistem ini memungkinkan pendaftaran UMKM,
                    pemantauan laporan kegiatan, serta analisis statistik untuk mendukung pengembangan UMKM lokal.
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#e63946] rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-600">Pendaftaran UMKM yang mudah dan terintegrasi</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#e63946] rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-600">Pemantauan laporan kegiatan secara real-time</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#e63946] rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-600">Analisis statistik untuk pengembangan UMKM</p>
                    </div>
                  </div>
                  <Button
                    asChild
                    className="bg-[#e63946] hover:bg-[#d62839] text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Link href="https://testing1umkm.netlify.app/" target="_blank" rel="noopener noreferrer">
                      Kunjungi Sistem Pendataan UMKM
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {umkmPreviewImages.map((img, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInAnimationVariants}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                      custom={index}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={img.src || "/placeholder.svg"}
                        alt={img.alt}
                        width={400}
                        height={250}
                        className="rounded-xl shadow-lg w-full h-auto object-cover border border-gray-200"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Sosialisasi Pelaku UMKM Section */}
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Sosialisasi Pelaku UMKM</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {umkmSocializationActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  variants={fadeInAnimationVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="p-4 text-left h-full flex flex-col justify-between overflow-hidden">
                    <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
                      <ImageWithBlur
                        src={activity.src || "/placeholder.svg"}
                        alt={activity.title}
                        width={300}
                        height={160}
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{activity.title}</h3>
                    <p className="text-gray-600 text-sm">{activity.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Pendataan Digital & Pembukuan UMKM Section */}
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Pendataan Digital & Pembukuan UMKM</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {umkmDigitalAndBookkeepingActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  variants={fadeInAnimationVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="p-4 text-left h-full flex flex-col justify-between overflow-hidden">
                    <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
                      <ImageWithBlur
                        src={activity.src || "/placeholder.svg"}
                        alt={activity.title}
                        width={300}
                        height={160}
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{activity.title}</h3>
                    <p className="text-gray-600 text-sm">{activity.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Video Kegiatan & Edukasi Digital Section */}
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Video Kegiatan & Edukasi Digital</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {umkmVideoActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  variants={fadeInAnimationVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    onClick={() => handleVideoCardClick(activity)} // Click handler for video
                  >
                    <CardContent className="p-0 relative h-96">
                      <ImageWithBlur
                        src={activity.thumbnail || "/placeholder.svg"} // Use thumbnail here
                        alt={`Thumbnail ${activity.title}`}
                        width={300}
                        height={400}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4 text-white">
                        <h3 className="font-bold text-xl mb-1">{activity.title}</h3>
                        <p className="text-sm opacity-80">{activity.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Anggota Kelompok Section */}
        <section className="py-20 px-4 md:px-10 bg-gradient-to-br from-slate-100 to-indigo-50" id="anggota-kelompok">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h2
              className="text-4xl font-bold text-gray-900 mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Anggota Kelompok Kami
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {members.map((member, index) => (
                <motion.div
                  key={index}
                  variants={fadeInAnimationVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="p-4 text-center h-full flex flex-col items-center justify-start">
                    <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-gray-200">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        layout="fill"
                        objectFit="cover"
                        className="object-top"
                      />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-sm text-gray-700">{member.faculty}</p>
                    <p className="text-sm text-gray-600 mb-2">{member.major}</p>
                    <p className="text-xs text-gray-500">NIM: {member.nim}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Dampak Kegiatan Kami Section (formerly Testimonials Section) */}
        <section className="py-20 px-4 md:px-10 bg-gradient-to-br from-indigo-50 to-slate-50" id="dampak-kegiatan">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h2
              className="text-4xl font-bold text-gray-900 mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Dampak Kegiatan Kami
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Ibu Ani (Warga Desa)",
                  quote: "Program KKNT ini sangat membantu anak-anak kami dalam belajar. Terima kasih banyak!",
                  rating: 5,
                },
                {
                  name: "Pak Budi (Pelaku UMKM)",
                  quote: "Pendampingan dari mahasiswa sangat bermanfaat untuk mengembangkan usaha kecil saya.",
                  rating: 4,
                },
                {
                  name: "Kepala Desa",
                  quote: "Kerja keras Kelompok 5 telah membawa banyak perubahan positif bagi desa kami.",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={fadeInAnimationVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={index}
                >
                  <Card className="p-6 text-left h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <Image
                        src="/placeholder.svg?height=50&width=50&text=Avatar"
                        alt={`Avatar of ${testimonial.name}`}
                        width={50}
                        height={50}
                        className="rounded-full mr-4"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                        <div className="flex">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          {Array.from({ length: 5 - testimonial.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-gray-300" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{testimonial.quote}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10 px-4 md:px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">KKNT Kelompok 5</h3>
            <p className="text-sm">Mengabdi untuk negeri, membangun desa, mengembangkan potensi.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#beranda" className="hover:text-[#e63946]">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="#laporan-kegiatan" className="hover:text-[#e63946]">
                  Laporan Kegiatan
                </Link>
              </li>
              <li>
                <Link href="#profil-kelompok" className="hover:text-[#e63946]">
                  Profil Kelompok
                </Link>
              </li>
              <li>
                <Link href="#pelaksanaan-multi-1" className="hover:text-[#e63946]">
                  Pelaksanaan Multi 1
                </Link>
              </li>
              <li>
                <Link href="#anggota-kelompok" className="hover:text-[#e63946]">
                  Anggota Kelompok
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-[#e63946]">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#e63946]">
                  Syarat & Ketentuan
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          &copy; {new Date().getFullYear()} KKNT Kelompok 5. Hak Cipta Dilindungi.
        </div>
      </footer>

      {/* Dialog for Report Details */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden rounded-lg">
          {selectedReport && (
            <div className="flex flex-col">
              <div className="relative w-full h-64">
                <Image
                  src={selectedReport.image || "/placeholder.svg"}
                  alt={selectedReport.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-6">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold mb-2">{selectedReport.title}</DialogTitle>
                  <DialogDescription className="text-gray-600 mb-4">{selectedReport.subtitle}</DialogDescription>
                </DialogHeader>
                <p className="text-gray-700 leading-relaxed">{selectedReport.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog for Video Playback */}
      <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
        <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden rounded-lg">
          {selectedVideo && (
            <div className="flex flex-col">
              <div className="relative w-full h-[500px] bg-black">
                <video
                  src={selectedVideo.src}
                  controls
                  autoPlay // Autoplay the video when dialog opens
                  className="w-full h-full object-contain" // Maintain aspect ratio
                  preload="auto" // Preload the entire video
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="p-6">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold mb-2">{selectedVideo.title}</DialogTitle>
                  <DialogDescription className="text-gray-600 mb-4">{selectedVideo.description}</DialogDescription>
                </DialogHeader>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
