import { useState } from 'react';
import {
  AnimatePresence,
  H5,
  ScrollView,
  Separator,
  SizableText,
  StackProps,
  styled,
  TabLayout,
  Tabs,
  TabsTabProps,
  YStack,
} from 'tamagui';
import HomeTab from './HomeTab';

interface DescriptionTabsProps {
  facilityId: number;
}

const DescriptionTabs: React.FC<DescriptionTabsProps> = (props) => {
  const { facilityId } = props;
  const [tabState, setTabState] = useState<{
    currentTab: string;
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
    prevActiveAt: null,
  });
  const setCurrentTab = (currentTab: string) => setTabState({ ...tabState, currentTab });
  const setActiveIndicator = (activeAt: TabLayout | null) =>
    setTabState({ ...tabState, prevActiveAt: tabState.activeAt, activeAt });
  const { activeAt, prevActiveAt, currentTab } = tabState;

  const direction = (() => {
    if (!activeAt || !prevActiveAt || activeAt.x === prevActiveAt.x) {
      return 0;
    }
    return activeAt.x > prevActiveAt.x ? -1 : 1;
  })();

  const handleOnInteraction: TabsTabProps['onInteraction'] = (type, layout) => {
    if (type === 'select') {
      setActiveIndicator(layout);
    }
  };
  return (
    <YStack width={'100%'}>
      <Tabs
        value={currentTab}
        onValueChange={setCurrentTab}
        orientation="horizontal"
        size="$4"
        height={500}
        flexDirection="column"
        activationMode="manual"
        width={'100%'}
      >
        <YStack>
          <AnimatePresence>
            {activeAt && (
              <TabsRovingIndicator
                active
                width={activeAt.width}
                height={3}
                x={activeAt.x}
                bottom={0}
                zIndex={1}
              />
            )}
          </AnimatePresence>
          <Tabs.List
            disablePassBorderRadius
            loop={false}
            aria-label="Facility description tabs"
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
            <Tabs.Content value={currentTab} forceMount flex={1}>
              <ScrollView contentContainerStyle={{ paddingBottom: 130 }} bounces={false}>
                {currentTab === 'tab1' ? (
                  <HomeTab facilityId={facilityId} />
                ) : (
                  <H5 textAlign="center">{currentTab}</H5>
                )}
              </ScrollView>
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

const TabsRovingIndicator = ({ active, ...props }: { active?: boolean } & StackProps) => {
  return (
    <YStack
      position="absolute"
      backgroundColor="red"
      opacity={0.7}
      animation="100ms"
      enterStyle={{
        opacity: 0,
      }}
      exitStyle={{
        opacity: 0,
      }}
      {...(active && {
        backgroundColor: '#000',
        borderRadius: 3,
        opacity: 1,
      })}
      {...props}
    />
  );
};
