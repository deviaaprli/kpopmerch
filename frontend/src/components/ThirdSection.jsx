import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const CircleImage = styled('img')({
  borderRadius: '50%',
  width: '500px', // Adjust the size as needed
  height: '500px', // Adjust the size as needed
  objectFit: 'cover', // Ensures the image covers the circular area
});

const StyledCard = styled(Card)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between', // Ensures equal spacing between image and content
  padding: '150px', // Adds padding around the card content
  height: '900px', // Set a fixed height to ensure equal column size
});

const PopularCarousel = () => {
  return (
    <section className="popular" id="popular">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        className="popular-row"
      >
        <SwiperSlide>
          <StyledCard variant="outlined">
            <Box sx={{ flexShrink: 0, mr: 2 }}>
              <CircleImage src="/blog-img2.png" alt="Card Holder Akrilik" />
            </Box>
            <CardContent sx={{ flexGrow: 1, padding: '0 16px' }}>
              <Typography variant="h6">Card Holder Akrilik</Typography>
              <Typography variant="body2" color="text.secondary">
                Siapa yang bingung mau bawa photocard pakai apa? Takut rusak kalau ditaruh dompet bukan? 
                Disini kamu bisa menemukan cardholder berbahan dasar akrilik yang sangat kokoh dan tidak 
                membuat photocard kalian rusak. Dengan lengkungan di tiap sudut sehingga sangat fit dan 
                tidak merusak atau menekuk tiap sudut photocard kalian.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ayo kepoin macam-macam design cardholder berbahan akrilik dengan klik disini...
              </Typography>
              <a href="#popular" className="btn">Learn More</a>
            </CardContent>
          </StyledCard>
        </SwiperSlide>
        <SwiperSlide>
          <StyledCard variant="outlined">
            <Box sx={{ flexShrink: 0, mr: 2 }}>
              <CircleImage src="/blog-img3.png" alt="Card Holder PVC" />
            </Box>
            <CardContent sx={{ flexGrow: 1, padding: '0 16px' }}>
              <Typography variant="h6">Card Holder PVC</Typography>
              <Typography variant="body2" color="text.secondary">
                Siapa yang tak asing dengan cardholder yang satu ini? Design dan warna yang beragam dan 
                menarik. Sayangnya cardholder ini berisiko tinggi merusak photocard kalian loh karena 
                bahannya yang lentur sekali.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Kami menyediakan beberapa cardholder official dari beberapa group dengan bahan PVC loh, 
                yuk kepoin group apa saja yang tersedia disini...
              </Typography>
              <a href="#popular" className="btn">Learn More</a>
            </CardContent>
          </StyledCard>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default PopularCarousel;
