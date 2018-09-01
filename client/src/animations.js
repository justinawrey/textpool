export const SlideFromLeft = posed.div({
    visible: {
        x: '0%',
        delay: 1300,
        delayChildren: 1800,
    },
    hidden: {
        x: '-200%',
    },
})

export const FadeInOut = posed.div({
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
})

export const FadeIn = posed.div({
    visible: {
        delay: 2100,
        opacity: 1,
        y: 0,
        transition: {
            duration: 1000,
        },
    },
    hidden: {
        opacity: 0,
        y: 20,
    },
})
