import React, { createContext, useState, useContext, useEffect } from "react"
import { AppState } from "react-native"
import { check, openSettings, PERMISSIONS, request } from 'react-native-permissions'

export const PermissionsInitState = () => {
    locationStatus: 'unavailable'
}

export const PermissionsContext = createContext({})

export const PermissionsProvider = ({ children }) => {

    const [permissions, setPermissions] = useState(PermissionsInitState)

    useEffect(() => {
        AppState.addEventListener('change', state => {
            console.log('state ', state)
            if (state !== 'active') return
            checkLocationPermission();
        })

    }, [])

    const askLocationPermission = async () => {
        console.log('askLocationPermission..')
        let permissionStatus;
        if (Platform.OS === 'ios') {
            permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

        } else {
            permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }

        if (permissionStatus === 'blocked') {
            openSettings();
        }

        setPermissions({
            ...permissions,
            locationStatus: permissionStatus
        })
    }

    const checkLocationPermission = async () => {
        let permissionStatus;
        if (Platform.OS === 'ios') {
            permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

        } else {
            permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }

        setPermissions({
            ...permissions,
            locationStatus: permissionStatus
        })
    }

    return (
        <PermissionsContext.Provider value={{
            permissions,
            askLocationPermission,
            checkLocationPermission
        }}>
            {children}
        </PermissionsContext.Provider>
    )
}