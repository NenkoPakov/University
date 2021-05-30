import React, { useState, useRef, useEffect } from 'react'
// import { findRenderedComponentWithType } from 'react-dom/test-utils';
import styled, { css } from 'styled-components/macro'
import { Button } from './Button';
import { IoMdArrowRoundForward } from 'react-icons/io'
import { IoArrowForward, IoArrowBack/*, IoCloudyNight*/ } from 'react-icons/io5'

const HeroSection = styled.section`
    height:90vh;
    max-height:1100px;
    position:relative;
    overflow:hidden;
`;

const HeroWrapper = styled.div`
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    overflow:hidden;
    position:relative;
`

const Slide = styled.div`
    z-index:1;
    width:100%;
    height:100%;
`

const Slider = styled.div`
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    display:flex;
    align-items:center;
    justify-content:left;
    padding-left:2rem;

    &::before{
    content:'';
    position:absolute;
    z-index:2;
    width:100%;
    height:100%;
    bottom:0vh;
    left:0;
    overflow:hidden;
    opacity:0.4;
    background:linear-gradient(
        0deg,
        rgba(0,0,0,0.2) 0%,
        rgba(0,0,0,0.2) 50%,
        rgba(0,0,0,0.6) 100%
        )
    }
`

const Image = styled.img`
    position:absolute;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    object-fit:cover;
`
const Content = styled.div`
    position:relative;
    z-index:10;
    display:flex;
    flex-direction:column;
    max-width:1600px;
    width:calc(100%-100px);
    color:#fff;

h1 {
    font-size:clamp(1rem, 8vw,2rem );
    font-weight:400;
    text-transform:uppercase;
    text-shadow:0px 0px 20px rgba(0,0,0.4);
    text-align:left;
    margin-bottom:0.8rem;
}

p {
    margin-bottom:1.2rem;
    text-shadow:0px 0px 20px rgba(0,0,0.4);
}
`

const arrowButtons = css`
    width:50px;
    height:50px;
    color:#fff;
    cursor:pointer;
    background:#000d1a;
    border-radius:50px;
    padding:10px;
    margin-right:1rem;
    user-select:none;
    transition:0.3s;

&:hover {
    background: #cd853f;
    transform: scale(1.1);
}
`

const Arrow = styled(IoMdArrowRoundForward)`
margin-left:0.5rem;
`

const SliderButtons = styled.div`
position:absolute;
bottom:50px;
right:50px;
display:flex;
z-index:10;
`
const PrevArrow = styled(IoArrowBack)`
${arrowButtons}
`
const NextArrow = styled(IoArrowForward)`
${arrowButtons}
`


const Hero = ({ slides }) => {
    const [current, setCurrent] = useState(0);
    const length = slides.length;
    const timeout = useRef(null);


    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    }

    useEffect(() => {
        timeout.current = setTimeout(nextSlide, 3000)

        return function () {
            if (timeout.current) {
                clearTimeout(timeout.current)
            }
        }

    }, [current, length])

    if (!Array.isArray(slides) || slides.length === 0) {
        return null;
    }

    return (
        <HeroSection>
            <HeroWrapper>
                <Slide key={current}>
                    <Slider>
                        <Image src={slides[current].image} alt={slides[current].alt} />
                        <Content>
                            <h1>{slides[current].title}</h1>
                            <p>{slides[current].info}</p>
                            <Button to={slides[current].path} primary='true' css={`max-width:160px;`} >
                                {slides[current].buttonLabel}
                                <Arrow />
                            </Button>
                        </Content>
                    </Slider>
                </Slide>
                <SliderButtons>
                    <PrevArrow onClick={prevSlide} />
                    <NextArrow onClick={nextSlide} />
                </SliderButtons>
            </HeroWrapper>
        </HeroSection>
    )
}

export default Hero
