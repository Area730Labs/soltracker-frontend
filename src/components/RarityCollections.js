// import React from 'react';
// import NavBarButton from './NavBarButton.js';


// class RarityCollections extends React.Component {

//     constructor(props) {
//         super(props);
    
//         this.onCheckClicked = this.onCheckClicked.bind(this);
//         this.handleChange = this.handleChange.bind(this);
    
//         this.state = {inputValue: '', isError: false, imageUrl: '', rank: 0, isLoading: false}
//     }

//     render() {
//       const collections = this.props.group;

//       return (
//         <div>
//             <div className="sidebar-heading">{groupData.groupName}</div>

//             {groupData.buttons.map((elem, i) => {
//                 const linkId = groupData.groupName + "_" + elem.name;
//                 const isActive = (linkId === this.props.activeTab);
//                 const iconClass = elem.icon;

//                 return (
//                     <NavBarButton name={elem.name} group={groupData.groupName} iconClass={iconClass} isActive={isActive} key={elem.name} onTabSelected={this.props.onTabSelected}/>
//                 )
//             })}

//             <hr className="sidebar-divider" />
//         </div>
//       );
//     }
// }


// export default MenuGroup;
