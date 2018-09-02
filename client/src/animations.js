import posed from 'react-pose'

export const slideFromLeftConfig = {
    visible: {
        x: '0%',
        delay: 1300,
        delayChildren: 2000,
    },
    hidden: {
        x: '-200%',
    },
}
export const SlideFromLeft = posed.div(slideFromLeftConfig)

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
            duration: duration || 1000,
        }),
    },
    fadeOut: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 1000,
        },
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
