import React, { FC, useEffect, useState } from 'react';
import { ActivityIndicator, Image, ImageStyle, TextStyle, View, ViewStyle } from 'react-native';
import { ListItem, Screen, Text } from '../components';
import { DemoTabScreenProps } from '../navigators/DemoNavigator';
import { $styles } from '../theme';
import { openLinkInBrowser } from '../utils/openLinkInBrowser';
import { isRTL } from '@/i18n';
import type { ThemedStyle } from '@/theme';
import { useAppTheme } from '@/utils/useAppTheme';
import { api } from '../services/api';
import type { Post } from '../services/api/api.types';

const chainReactLogo = require('../../assets/images/demo/cr-logo.png');
const reactNativeLiveLogo = require('../../assets/images/demo/rnl-logo.png');
const reactNativeRadioLogo = require('../../assets/images/demo/rnr-logo.png');
const reactNativeNewsletterLogo = require('../../assets/images/demo/rnn-logo.png');

export const DemoCommunityScreen: FC<DemoTabScreenProps<'DemoCommunity'>> =
  function DemoCommunityScreen(_props) {
    const { themed } = useAppTheme();
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    return (
      <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={['top']}>
        <Text preset="heading" tx="demoCommunityScreen:title" style={themed($title)} />
        <Text tx="demoCommunityScreen:tagLine" style={themed($tagline)} />

        <Text preset="subheading" text="Latest Posts" style={themed($sectionTitle)} />
        {isLoading ? (
          <ActivityIndicator size="large" style={$spinner} />
        ) : error ? (
          <Text style={$error}>{error}</Text>
        ) : (
          <>
            {posts.map((post) => (
              <ListItem
                key={post.id}
                text={post.title}
                bottomSeparator
                rightIcon={isRTL ? 'caretLeft' : 'caretRight'}
                onPress={() => {}}
              />
            ))}
          </>
        )}

        <Text
          preset="subheading"
          tx="demoCommunityScreen:joinUsOnSlackTitle"
          style={themed($sectionTitle)}
        />
        <Text tx="demoCommunityScreen:joinUsOnSlack" style={themed($description)} />
        <ListItem
          tx="demoCommunityScreen:joinSlackLink"
          leftIcon="slack"
          rightIcon={isRTL ? 'caretLeft' : 'caretRight'}
          onPress={() => openLinkInBrowser('https://community.infinite.red/')}
        />
        <Text
          preset="subheading"
          tx="demoCommunityScreen:makeIgniteEvenBetterTitle"
          style={themed($sectionTitle)}
        />
        <Text tx="demoCommunityScreen:makeIgniteEvenBetter" style={themed($description)} />
        <ListItem
          tx="demoCommunityScreen:contributeToIgniteLink"
          leftIcon="github"
          rightIcon={isRTL ? 'caretLeft' : 'caretRight'}
          onPress={() => openLinkInBrowser('https://github.com/infinitered/ignite')}
        />

        <Text
          preset="subheading"
          tx="demoCommunityScreen:theLatestInReactNativeTitle"
          style={themed($sectionTitle)}
        />
        <Text tx="demoCommunityScreen:theLatestInReactNative" style={themed($description)} />
        <ListItem
          tx="demoCommunityScreen:reactNativeRadioLink"
          bottomSeparator
          rightIcon={isRTL ? 'caretLeft' : 'caretRight'}
          LeftComponent={
            <View style={[$styles.row, themed($logoContainer)]}>
              <Image source={reactNativeRadioLogo} style={$logo} />
            </View>
          }
          onPress={() => openLinkInBrowser('https://reactnativeradio.com/')}
        />
        <ListItem
          tx="demoCommunityScreen:reactNativeNewsletterLink"
          bottomSeparator
          rightIcon={isRTL ? 'caretLeft' : 'caretRight'}
          LeftComponent={
            <View style={[$styles.row, themed($logoContainer)]}>
              <Image source={reactNativeNewsletterLogo} style={$logo} />
            </View>
          }
          onPress={() => openLinkInBrowser('https://reactnativenewsletter.com/')}
        />
        <ListItem
          tx="demoCommunityScreen:reactNativeLiveLink"
          bottomSeparator
          rightIcon={isRTL ? 'caretLeft' : 'caretRight'}
          LeftComponent={
            <View style={[$styles.row, themed($logoContainer)]}>
              <Image source={reactNativeLiveLogo} style={$logo} />
            </View>
          }
          onPress={() => openLinkInBrowser('https://rn.live/')}
        />
        <ListItem
          tx="demoCommunityScreen:chainReactConferenceLink"
          rightIcon={isRTL ? 'caretLeft' : 'caretRight'}
          LeftComponent={
            <View style={[$styles.row, themed($logoContainer)]}>
              <Image source={chainReactLogo} style={$logo} />
            </View>
          }
          onPress={() => openLinkInBrowser('https://cr.infinite.red/')}
        />
      </Screen>
    );
  };

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
});

const $tagline: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xxl,
});

const $description: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
});

const $sectionTitle: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginTop: spacing.xxl,
});

const $logoContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginEnd: spacing.md,
  flexWrap: 'wrap',
  alignContent: 'center',
  alignSelf: 'stretch',
});

const $logo: ImageStyle = {
  height: 38,
  width: 38,
};

const $spinner: ViewStyle = {
  marginVertical: 20,
};

const $error: TextStyle = {
  color: 'red',
  textAlign: 'center',
  marginVertical: 20,
};
