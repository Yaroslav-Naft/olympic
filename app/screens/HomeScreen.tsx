import React, { FC, useEffect, useState } from "react"
import {
  ActivityIndicator,
  Image,
  ImageStyle,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { Card, Screen, Switch, SwitchToggleProps, Text } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { $styles, colors } from "../theme"
import type { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { api } from "../services/api"
import { Toggle } from "@/components/Toggle/Toggle"

export function TempSwitch(props: SwitchToggleProps) {
  const [val, setVal] = useState(props.value || false)
  return <Switch value={val} onPress={() => setVal(!val)} />
}

export const HomeScreen: FC<DemoTabScreenProps<"Home" | "Calendar" | "Comfort" | "Settings">> =
  function HomeScreen(_props) {
    const { themed } = useAppTheme()
    const [temp, setTemp] = useState<number | null>()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
      async function fetchTemp() {
        setIsLoading(true)
        setError("")
        const result = await api.getTemp()

        if (result.kind === "ok") {
          setTemp(result.data)
        } else {
          setError("Failed to load Temperature data")
          setTemp(null)
        }

        setIsLoading(false)
      }

      fetchTemp()
    }, [])

    return (
      <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
        <Text preset="heading" tx="homeScreen:title" style={themed($title)} />
        {/* <Text tx="homeScreen:tagLine" style={themed($tagline)} /> */}
        {isLoading ? (
          <ActivityIndicator size="large" style={$spinner} />
        ) : error ? (
          <Text style={$error}>{error}</Text>
        ) : (
          <View>
            <Card
              heading={`${temp != null && !isNaN(temp) ? Math.round(temp) : "--"}°C`}
              style={themed($temperatureCard)}
              headingStyle={themed($temperatureHeading)}
              contentTx="homeScreen:indoorTemp"
              contentStyle={themed($temperatureContent)}
              RightComponent={
                <View style={themed($powerButton)}>
                  <TempSwitch />
                </View>
              }
              FooterComponent={
                <View style={$footerContainer}>
                  <View style={$footerItem}>
                    <Text style={themed($footerText)}>🌥 32°C |</Text>
                  </View>
                  <View style={$footerItem}>
                    <Text style={themed($footerText)}>💨 55% |</Text>
                  </View>
                  <View style={$footerItem}>
                    <Text style={themed($footerText)}>🕒 Thu 24 Nov | 5:45 PM</Text>
                  </View>
                </View>
              }
            />
            <Card
              heading="24°C"
              style={[themed($temperatureCard), { backgroundColor: "#f5f5f5" }]}
              headingStyle={themed($temperatureHeading)}
              contentTx="homeScreen:indoorTemp"
              contentStyle={themed($temperatureContent)}
              RightComponent={
                <View style={$controlsContainer}>
                  <TouchableOpacity style={themed($tempButton)}>
                    <Text style={themed($buttonText)}>-</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={themed($tempButton)}>
                    <Text style={themed($buttonText)}>+</Text>
                  </TouchableOpacity>
                </View>
              }
            />
          </View>
        )}
      </Screen>
    )
  }

const $temperatureCard: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.neutral100,
  borderRadius: spacing.lg,
  padding: spacing.md,
  marginBottom: spacing.xs,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 5,
})

const $powerButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  position: "absolute",
  right: spacing.sm,
  top: spacing.sm,
  backgroundColor: colors.palette.neutral200,
  padding: spacing.xs,
  borderRadius: 20,
  width: 40,
  height: 40,
  justifyContent: "center",
  alignItems: "center",
})

const $temperatureHeading: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  fontSize: 20,
  fontWeight: "600",
  color: colors.text,
  marginBottom: spacing.xs,
})

const $temperatureContent: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  fontSize: 18,
  color: colors.textDim,
  marginBottom: spacing.md,
})

const $footerContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const $footerItem: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $footerText: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 14,
  color: colors.textDim,
})

const $controlsContainer: ViewStyle = {
  flexDirection: "row",
  position: "absolute",
  right: 16,
  top: 16,
  gap: 8,
}

const $controlButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: 32,
  height: 32,
  borderRadius: 16,
  backgroundColor: colors.palette.neutral200,
  justifyContent: "center",
  alignItems: "center",
})

const $controlText: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 24,
  fontWeight: "500",
  color: colors.text,
})

const $buttonText: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  fontSize: 36, // Significantly increased from 24
  fontWeight: "800", // Increased weight for more prominence
  color: colors.text,
  marginBottom: spacing.xs,
})

const $tempButton: ThemedStyle<TextStyle> = ({ spacing }) => ({
  fontSize: 24,
  marginBottom: spacing.xl,
})

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xl,
})
const $controlContainer: ThemedStyle<TextStyle> = ({ spacing }) => ({
  flexDirection: "row",
  position: "absolute",
  right: 16,
  top: 16,
  gap: 8,
})

const $spinner: ViewStyle = {
  marginVertical: 20,
}

const $error: TextStyle = {
  color: "red",
  textAlign: "center",
  marginVertical: 20,
}
