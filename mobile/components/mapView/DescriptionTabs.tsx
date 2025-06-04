import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import {
  AnimatePresence,
  H5,
  Separator,
  SizableText,
  styled,
  TabLayout,
  Tabs,
  TabsTabProps,
  YStack,
} from 'tamagui';

const DescriptionTabs = () => {
  const [tabState, setTabState] = useState<{
    currentTab: string;
    /**
     * Layout of the Tab user might intend to select (hovering / focusing)
     */
    intentAt: TabLayout | null;
    /**
     * Layout of the Tab user selected
     */
    activeAt: TabLayout | null;
    /**
     * Used to get the direction of activation for animating the active indicator
     */
    prevActiveAt: TabLayout | null;
  }>({
    activeAt: null,
    currentTab: 'tab1',
    intentAt: null,
    prevActiveAt: null,
  });
  const setCurrentTab = (currentTab: string) => setTabState({ ...tabState, currentTab });
  const setIntentIndicator = (intentAt: TabLayout | null) => setTabState({ ...tabState, intentAt });
  const setActiveIndicator = (activeAt: TabLayout | null) =>
    setTabState({ ...tabState, prevActiveAt: tabState.activeAt, activeAt });
  const { activeAt, intentAt, prevActiveAt, currentTab } = tabState;

  const direction = (() => {
    if (!activeAt || !prevActiveAt || activeAt.x === prevActiveAt.x) {
      return 0;
    }
    return activeAt.x > prevActiveAt.x ? -1 : 1;
  })();

  const handleOnInteraction: TabsTabProps['onInteraction'] = (type, layout) => {
    if (type === 'select') {
      setActiveIndicator(layout);
    } else {
      setIntentIndicator(layout);
    }
  };
  return (
    <YStack width={'100%'}>
      <Tabs
        value={currentTab}
        onValueChange={setCurrentTab}
        orientation="horizontal"
        size="$4"
        height={150}
        flexDirection="column"
        activationMode="manual"
        borderRadius="$4"
        width={'100%'}
      >
        <YStack>
          <AnimatePresence>{intentAt && <Text>Intent Indicator</Text>}</AnimatePresence>
          <AnimatePresence>{activeAt && <Text>Intent Indicator</Text>}</AnimatePresence>
          <Tabs.List
            disablePassBorderRadius
            loop={false}
            aria-label="Manage your account"
            borderBottomLeftRadius={0}
            borderBottomRightRadius={0}
            paddingBottom="$1.5"
            borderColor="$color3"
            borderBottomWidth="$0.5"
            backgroundColor="transparent"
            justifyContent="space-around"
          >
            <Tabs.Tab
              unstyled
              paddingHorizontal="$3"
              paddingVertical="$2"
              value="tab1"
              onInteraction={handleOnInteraction}
            >
              <SizableText>Home</SizableText>
            </Tabs.Tab>
            <Tabs.Tab
              unstyled
              paddingHorizontal="$3"
              paddingVertical="$2"
              value="tab2"
              onInteraction={handleOnInteraction}
            >
              <SizableText>Updates</SizableText>
            </Tabs.Tab>
            <Tabs.Tab
              unstyled
              paddingHorizontal="$3"
              paddingVertical="$2"
              value="tab3"
              onInteraction={handleOnInteraction}
            >
              <SizableText>Menu</SizableText>
            </Tabs.Tab>
            <Tabs.Tab
              unstyled
              paddingHorizontal="$3"
              paddingVertical="$2"
              value="tab4"
              onInteraction={handleOnInteraction}
            >
              <SizableText>Reviews</SizableText>
            </Tabs.Tab>
          </Tabs.List>
        </YStack>
        <Separator />
        <AnimatePresence exitBeforeEnter custom={{ direction }} initial={false}>
          <AnimatedYStack key={currentTab}>
            <Tabs.Content value={currentTab} forceMount flex={1} justifyContent="center">
              <H5 textAlign="center">{currentTab}</H5>
            </Tabs.Content>
          </AnimatedYStack>
        </AnimatePresence>
      </Tabs>
    </YStack>
  );
};

export default DescriptionTabs;

const AnimatedYStack = styled(YStack, {
  flex: 1,
  x: 0,
  opacity: 1,

  animation: '100ms',
  variants: {
    // 1 = right, 0 = nowhere, -1 = left
    direction: {
      ':number': (direction) => ({
        enterStyle: {
          x: direction > 0 ? -25 : 25,
          opacity: 0,
        },
        exitStyle: {
          zIndex: 0,
          x: direction < 0 ? -25 : 25,
          opacity: 0,
        },
      }),
    },
  } as const,
});

const styles = StyleSheet.create({});
