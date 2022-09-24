import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import IC_Drawer_IOS from "./../assets/icons/ic_drawer_header.svg";
import React, { PureComponent } from 'react'

const styles = { paddingVertical: 10, paddingRight: 20, }
export default class HeaderDrawer extends PureComponent {

    render() {
        return (
            <TouchableOpacity {...this.props} style={styles}
            >
                <IC_Drawer_IOS />
            </TouchableOpacity>
        )
    }
}