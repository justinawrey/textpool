import posed from 'react-pose'

export const slideFromLeftConfig = {
    visible: {
        x: '0%',
        delay: 150,
        delayChildren: 800,
        staggerChildren: 50,
    },
    hidden: {
        x: '-200%',
    },
}
export const SlideFromLeft = posed.div(slideFromLeftConfig)

export const slideFromBLCornerConfig = {
    visible: {
        opacity: 1,
        y: -10,
        x: -10,
        transition: ({ duration }) => ({
            duration: duration || 200,
        }),
    },
    hidden: {
        opacity: 0,
        y: 0,
        x: 0,
    },
}
export const SlideFromBLCorner = posed.div(slideFromBLCornerConfig)

export const fadeInOutConfig = {
    beforeFade: {
        opacity: 0,
        y: 20,
    },
    fadeIn: {
        opacity: 1,
        y: 0,
        delay: ({ delay }) => delay || 0,
        transition: ({ duration }) => ({
            duration: duration || 750,
        }),
    },
    fadeOut: {
        opacity: 0,
        y: -20,
        transition: ({ outDuration }) => ({
            duration: outDuration || 750,
        }),
    },
}
export const FadeInOut = posed.div(fadeInOutConfig)

export const fadeInConfig = {
    visible: {
        delay: ({ delay }) => delay || 0,
        opacity: 1,
        y: 0,
        transition: ({ duration }) => ({
            duration: duration || 200,
        }),
    },
    hidden: {
        opacity: 0,
        y: 20,
    },
}
export const FadeIn = posed.div(fadeInConfig)
