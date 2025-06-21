import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, Heart, MessageCircle, Sparkles, Star, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import LayoutSection from './layout-section';
import CarouselComunityPict from './list-pict-about-comunity';
import TextWrapedBorder from './text-wrapped';

// Animation variants for scroll-triggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      duration: 0.6,
    },
  },
};

const fadeInUpVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      duration: 0.3,
    },
  },
};

const slideInLeftVariants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      duration: 0.7,
    },
  },
};

const slideInRightVariants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      duration: 0.7,
    },
  },
};

const scaleInVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 15,
      duration: 0.6,
    },
  },
};

const TentangKomunistas = () => {
  const stats = [
    { icon: Users, label: 'Anggota Aktif', value: '2,500+' },
    { icon: BookOpen, label: 'Buku Dibaca', value: '15,000+' },
    { icon: MessageCircle, label: 'Diskusi', value: '500+' },
    { icon: Star, label: 'Rating Rata-rata', value: '4.8/5' },
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Perpustakaan Digital',
      description: 'Akses ke ribuan buku dan materi literasi berkualitas',
    },
    {
      icon: Users,
      title: 'Komunitas Aktif',
      description: 'Bergabung dengan ribuan pembaca dari seluruh Indonesia',
    },
    {
      icon: MessageCircle,
      title: 'Diskusi Mendalam',
      description: 'Forum diskusi untuk membahas buku dan ide-ide menarik',
    },
  ];

  return (
    <LayoutSection className="relative overflow-hidden pt-0 md:py-0">
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {stats.map((stat, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="border-none bg-white/90 backdrop-blur-sm hover:bg-white/70 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="w-full mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div
            variants={scaleInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              Komunitas Literasi Terdepan
            </Badge>
          </motion.div>
          <h1 className="md:text-6xl text-3xl font-bold mb-6 to-secondary text-primary eading-tight">
            <TextWrapedBorder>Sekilas Komunitas ini</TextWrapedBorder>
          </h1>
          <p className="md:text-xl text-sm text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Tempat berkumpulnya para penggemar buku untuk berbagi pengetahuan, pengalaman, dan
            membangun masa depan literasi yang lebih baik
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <motion.div
            className="space-y-8"
            variants={slideInLeftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div
              variants={scaleInVariants}
              whileHover={{
                scale: 1.02,
                transition: { type: 'spring', stiffness: 200, damping: 15 },
              }}
            >
              <Card className="border-none bg-muted/20">
                <CardHeader className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white5 border rounded-lg">
                      <Heart className="w-6 h-6 text-rose-400 " />
                    </div>
                    <CardTitle className="md:text-3xl text-xl font-bold">
                      Tentang Komunitas
                    </CardTitle>
                  </div>
                  <CardDescription className="md:text-lg text-sm leading-relaxed space-y-4">
                    <span className="text-foreground/80">
                      Komunitas ini adalah wadah berkumpulnya para penggemar buku yang bertujuan
                      untuk membantu para pengguna memahami lebih dalam tentang dunia literasi dan
                      komunisme.
                    </span>
                    <span className="text-muted-foreground">
                      Bersama, kita membangun lingkungan yang mendukung pertukaran ide dan
                      pengembangan pengetahuan untuk menciptakan generasi yang lebih cerdas dan
                      kritis.
                    </span>
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            {/* Features */}
            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    x: 8,
                    transition: { type: 'spring', stiffness: 200, damping: 15 },
                  }}
                >
                  <Card className="border-none bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-white/10 border rounded-xl group-hover:bg-primary/5 transition-colors duration-300">
                          <feature.icon className="md:w-6 md:h-6 w-4 h-4 text-rose-500 " />
                        </div>
                        <div className="flex-1">
                          <h3 className="md:text-lg text-sm font-semibold mb-2 text-foreground">
                            {feature.title}
                          </h3>
                          <p className="md:text-sm text-xs text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="h-full my-auto relative"
            variants={slideInRightVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.3, type: 'spring', stiffness: 100, damping: 15 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <CarouselComunityPict />
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          whileHover={{
            scale: 1.02,
            transition: { type: 'spring', stiffness: 150, damping: 15 },
          }}
        >
          <Card className="border-none  bg-background border  border-[#dbdbdb] shadow">
            <CardContent className="p-8 text-center">
              <h3 className="md:text-2xl text-xl font-bold mb-4 ">
                Siap Bergabung dengan Komunitas Kami?
              </h3>
              <span className="md:text-lg text-sm text-muted-foreground mb-6 max-w-2xl mx-auto">
                Mulai perjalanan literasi Anda bersama ribuan pembaca lainnya. Dapatkan akses ke
                diskusi eksklusif, rekomendasi buku, dan banyak lagi.
              </span>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center mt-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div variants={itemVariants}>
                  <Button size="lg" className="">
                    <Users className="w-5 h-5 mr-2" />
                    Bergabung Sekarang
                  </Button>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-primary/20 hover:bg-primary/5 transition-all duration-300"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Jelajahi Buku
                  </Button>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </LayoutSection>
  );
};

export default TentangKomunistas;
