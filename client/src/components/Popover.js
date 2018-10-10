import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'
import {
    addToWhitelist,
    addToBlacklist,
    removeFromWhitelist,
    removeFromBlacklist,
} from '../actions'
import { SlideFromBLCorner } from '../animations'

const StyledConfig = styled(SlideFromBLCorner)`
    background-color: ${({ theme }) => theme.primary.light};
    padding: ${({ theme }) => `${theme.baseMargin * 5}px`};
`
const StyledList = styled.div`
    margin-bottom: ${({ theme }) => `${theme.baseMargin * 2}px`};

    p {
        font-size: 0.8rem;
        margin: 0;
        font-weight: bold;
    }

    & > div > div:last-child {
        color: red;
    }
`

const PhoneNumber = styled.div`
    font-size: 0.7rem;
    svg {
        margin-left: 0.5rem;
        transition: color 0.2s ease-in-out;
    }

    svg:hover {
        color: red;
    }
`

const StyledTooltip = styled(SlideFromBLCorner)``

const StyledFAIcon = styled(FontAwesomeIcon)`
    opacity: ${({ pose }) => (pose === 'visible' ? 0.5 : 1)};
    color: ${({ theme }) => theme.secondary.med};
    transition: opacity 0.2s ease-in-out;

    :hover {
        opacity: 0.5;
    }
`

// TODO: dont use list idx as key prop
const AddableList = ({ items, title }) => (
    <StyledList>
        <p>{title}</p>
        <div>
            {items.map((number, idx) => (
                <PhoneNumber key={idx}>
                    {number}
                    <FontAwesomeIcon icon="times" size="xs" />
                </PhoneNumber>
            ))}
            <div> last </div>
        </div>
    </StyledList>
)

const WhiteList = connect(
    state => ({
        items: state.whiteList,
        title: 'Whitelist',
    }),
    dispatch => ({
        addNumber: number => dispatch(addToWhitelist(number)),
        removeNumber: number => dispatch(removeFromWhitelist(number)),
    }),
)(AddableList)

const Blacklist = connect(
    state => ({
        items: state.blackList,
        title: 'Blacklist',
    }),
    dispatch => ({
        addNumber: number => dispatch(addToBlacklist(number)),
        removeNumber: number => dispatch(removeFromBlacklist(number)),
    }),
)(AddableList)

const ConfigPopover = ({ pose }) => (
    <StyledConfig pose={pose}>
        <WhiteList />
        <Blacklist />
    </StyledConfig>
)

const TooltipPopover = ({ text, pose }) => (
    <StyledTooltip pose={pose}>{text}</StyledTooltip>
)

const WhitelistPopover = ({ pose }) => (
    <TooltipPopover
        pose={pose}
        text="Phone numbers in this list have SMS playback control."
    />
)

const BlacklistPopover = ({ pose }) => (
    <TooltipPopover
        pose={pose}
        text="Phone numbers in this list are blocked from queueing songs."
    />
)

// Popover generator.
// icon is the icon (in font awesome names) to show which
// triggers the popover.
// type is the popover trigger event; either 'hover' or 'click'.
// popoverComponent is the component which is shown
// when the popover is triggered.
export default (icon, type, PopoverComponent) =>
    class Popover extends Component {
        constructor(props) {
            super(props)
            this.state = {
                open: false,
            }
        }

        toggle = () => this.setState(({ open }) => ({ open: !open }))

        capitalizeType(type) {
            type.charAt(0).toUpperCase() + type.slice(1)
        }

        render() {
            const { open } = this.state
            const pose = open ? 'visible' : 'hidden'
            return (
                <Fragment>
                    <PopoverComponent pose={pose} />
                    <StyledFAIcon
                        icon={icon}
                        size="lg"
                        pose={pose}
                        // Looks funky.. just dynamically sets the synthetic event trigger
                        // to either onHover or onClick
                        {...{
                            [`on${this.capitalizeType(type)}`]: this.toggle,
                        }}
                    />
                </Fragment>
            )
        }
    }

export { ConfigPopover, WhitelistPopover, BlacklistPopover }
