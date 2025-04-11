import React, { FC, useEffect, useState } from "react"
import { ActivityIndicator, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Card, Screen, Text } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { $styles } from "../theme"
import type { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { api } from "../services/api"

export const DemoHomeScreen: FC<DemoTabScreenProps<"DemoHome" | "DemoCalendar" | "DemoComfort" | "DemoSettings">> =
  function DemoHomeScreen(_props) {
    const { themed } = useAppTheme()
    const [temp, setTemp] = useState<number>()
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
        }

        setIsLoading(false)
      }

      fetchTemp()
    }, [])

    return (
      <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
        <Text preset="heading" tx="demoCommunityScreen:title" style={themed($title)} />
        <Text tx="demoHomeScreen:tagLine" style={themed($tagline)} />

        {isLoading ? (
          <ActivityIndicator size="large" style={$spinner} />
        ) : error ? (
          <Text style={$error}>{error}</Text>
        ) : (
          <View>
            <Card
              heading={`${temp ? Math.round(temp) : '--'}°C`}
              content="Indoor Temperature"
              footer="🌥 32°C   💨 55%   🕒 Thu 24 Nov | 5:45 PM"
            />
            <Card
              heading="Temperature Setpoint"
              footer="🕒 21°C"
            />
          </View>
        )}
      </Screen>
    )
  }

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $tagline: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xxl,
})

const $spinner: ViewStyle = {
  marginVertical: 20,
}

const $error: TextStyle = {
  color: "red",
  textAlign: "center",
  marginVertical: 20,
}
