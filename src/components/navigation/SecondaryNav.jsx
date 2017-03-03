import React from 'react'
import NavItem from './NavItem'
import SearchBox from './SearchBox'
import LanguageSwitch from './LanguageSwitch'

const SecondaryNav = ({absorbedItems, normalItems}) => (
    <div id="hiddenNav">
        <div className="slimScrollDiv">
            <div id="scrollableNav">
                <div className="ActivEngageChatButtonWrapper">
                    <div id="ActivEngageChatButton">
                        <div role="button" tabIndex="0">&nbsp;</div>
                    </div>
                </div>
                <a className="liveChat" href="https://go.activengage.com/s/sites/static/chat?d=www.vw.com&amp;r=" target="_blank">Live Chat</a>

                <ul>
                    {absorbedItems.map((item, index) => <NavItem key={index} type="hidden" {...item} />)}
                    {normalItems.map((item, index) => <NavItem key={index} {...item} />)}
                </ul>

                <SearchBox />
                <LanguageSwitch />
            </div>
            <div className="slimScrollBar"></div>
            <div className="slimScrollRail"></div>
        </div>
    </div>
)

export default SecondaryNav
