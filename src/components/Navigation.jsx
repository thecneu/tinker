import React from 'react'
import PrimaryNav from './navigation/PrimaryNav'
import SecondaryNav from './navigation/SecondaryNav'

class Navigation extends React.Component {
  state = {
    primaryItems: [{
        className: 'models',
        url: '/models/',
        name: 'Models'
    }, {
        className: 'find-a-match',
        url: '/find-match/',
        name: 'Find a Match'
    }, {
        className: 'build-your-own',
        url: '/builder/',
        name: 'Build<br> Your Own'
    }, {
        className: 'find-a-dealer',
        url: '/find-a-dealer/',
        name: 'Find A Dealer'
    }, {
        className: 'owners',
        url: '/owners/',
        name: 'Owners'
    }],
    normalItems: [{
        className: 'special-offers',
        url: '/special-offers/',
        name: 'Special Offers'
    }, {
        className: 'financial-services',
        url: 'financial-services',
        name: 'Financial Services'
    }, {
        className: 'profile',
        url: '/me/',
        name: 'Favorites'
    }, {
        className: 'certified-pre-owned',
        url: '/certified-pre-owned/',
        name: 'Certified Pre-Owned'
    }, {
        className: 'corporate',
        url: '/corporate/',
        name: 'Corporate'
    }, {
        className: 'newsroom',
        url: 'http://newsroom.vw.com/',
        name: 'newsroom'
    }, {
        className: 'contact',
        url: '/contact/',
        name: 'Contact Us'
    }]
  }

  render() {
    return (
      <div className="parbase navigation navigationMenu">
        <div id="superTint"></div>
        <div id="tint"></div>

        <div id="primaryNav">
          <PrimaryNav primaryItems={this.state.primaryItems} />
          <SecondaryNav absorbedItems={this.state.primaryItems} normalItems={this.state.normalItems} />
        </div>
      </div>
    )
  }
}

export default Navigation