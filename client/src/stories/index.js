import React from 'react'
import { storiesOf } from '@storybook/react'
import { ThemeProvider } from 'styled-components'

import Lettuce from '../themes'

storiesOf('Button', module)
    .addDecorator(story => (
        <ThemeProvider theme={Lettuce}>{story()}</ThemeProvider>
    ))
    .add('popover', () => <div />)
