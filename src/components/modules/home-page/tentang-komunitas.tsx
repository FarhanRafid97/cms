import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, Heart, MessageCircle, Sparkles, Users } from 'lucide-react';
import { motion } from 'motion/react';
import LayoutSection from './layout-section';
import CarouselComunityPict from './list-pict-about-comunity';
import TextWrapedBorder from './text-wrapped';

const TentangKomunistas = () => {
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
      <div className="w-full mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 25, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ type: 'spring', bounce: 0.3, duration: 0.9 }}
          viewport={{ once: true, margin: '-30px' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotateY: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 140, mass: 0.8, duration: 0.7 }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  repeatDelay: 3,
                }}
              >
                <Sparkles className="w-4 h-4 mr-2" />
              </motion.div>
              Komunitas Literasi Terdepan
            </Badge>
          </motion.div>

          <motion.h1
            className="md:text-6xl text-2xl font-bold mb-6 to-secondary text-primary leading-tight"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', bounce: 0.3, delay: 0.2, duration: 1 }}
            viewport={{ once: true }}
          >
            <TextWrapedBorder>Sekilas Komunitas ini</TextWrapedBorder>
          </motion.h1>

          <motion.p
            className="md:text-xl text-xs text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', bounce: 0.3, delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Tempat berkumpulnya para penggemar buku untuk berbagi pengetahuan, pengalaman, dan
            membangun masa depan literasi yang lebih baik
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 80, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ type: 'spring', bounce: 0.3, duration: 0.9 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -2, rotateX: 2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
            >
              <Card className="border-none bg-background">
                <CardHeader className="space-y-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="p-2 bg-white5 border rounded-lg"
                      animate={{
                        rotate: [0, 2, -2, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        repeatDelay: 2,
                      }}
                    >
                      <Heart className="w-6 h-6 text-sky-500" />
                    </motion.div>
                    <CardTitle className="md:text-3xl text-xl font-bold">
                      Tentang Komunitas
                    </CardTitle>
                  </div>
                  <CardDescription className="md:text-sm text-xs leading-relaxed space-y-4">
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
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 80, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ type: 'spring', bounce: 0.3, duration: 0.9 }}
                  whileHover={{ x: 12, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="border-none bg-background backdrop-blur-sm hover:bg-background/80 transition-all duration-500 group">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <motion.div
                          className="p-3 bg-background-new/95 border rounded-xl group-hover:bg-primary/5 transition-colors duration-300"
                          whileHover={{
                            scale: 1.1,
                            rotate: 5,
                            transition: { type: 'spring', bounce: 0.3, duration: 0.3 },
                          }}
                        >
                          <feature.icon className="md:w-6 md:h-6 w-4 h-4 text-sky-500" />
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="md:text-lg text-sm font-semibold mb-2 text-foreground">
                            {feature.title}
                          </h3>
                          <p className="md:text-sm text-xs text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                        <motion.div
                          whileHover={{
                            x: 6,
                            scale: 1.2,
                            rotate: -10,
                            transition: {
                              type: 'spring',
                              damping: 20,
                              stiffness: 140,
                              mass: 0.8,
                              duration: 0.3,
                            },
                          }}
                        >
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all duration-300" />
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="h-full my-auto relative"
            initial={{ opacity: 0, y: 80, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ type: 'spring', bounce: 0.3, duration: 0.9 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <CarouselComunityPict />
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 25, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ type: 'spring', bounce: 0.3, duration: 0.9 }}
          viewport={{ once: true, margin: '-40px' }}
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -2, rotateX: 2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
          >
            <Card className="border-none bg-background border border-[#dbdbdb] shadow">
              <CardContent className="p-8 text-center">
                <motion.h3
                  className="md:text-2xl text-xl font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', bounce: 0.3, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Siap Bergabung dengan Komunitas Kami?
                </motion.h3>
                <motion.span
                  className="md:text-md text-sm text-muted-foreground mb-6 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', bounce: 0.3, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Mulai perjalanan literasi Anda bersama ribuan pembaca lainnya. Dapatkan akses ke
                  diskusi eksklusif, rekomendasi buku, dan banyak lagi.
                </motion.span>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center mt-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{
                    staggerChildren: 0.15,
                    delayChildren: 0.1,
                    type: 'spring',
                    bounce: 0.3,
                  }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.96, rotateX: -10 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    transition={{ type: 'spring', bounce: 0.3, duration: 0.8 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: 'spring',
                        damping: 20,
                        stiffness: 140,
                        mass: 0.8,
                        duration: 0.3,
                      }}
                    >
                      <Button size="lg" className="">
                        <Users className="w-5 h-5 mr-2" />
                        Bergabung Sekarang
                      </Button>
                    </motion.div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.96, rotateX: -10 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    transition={{ type: 'spring', bounce: 0.3, duration: 0.8 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: 'spring',
                        damping: 20,
                        stiffness: 140,
                        mass: 0.8,
                        duration: 0.3,
                      }}
                    >
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
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </LayoutSection>
  );
};

export default TentangKomunistas;
