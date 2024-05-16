import React, { useState, useRef, ReactNode } from 'react';
import { TabGroup } from '@headlessui/react';
import { cn } from '../../lib/cn';
import { ExtractProps } from '../../lib/extract-props';
import { TabList } from './tab-list';
import { TabListItem } from './tab-list-item';
import { TabPanels } from './tab-panels';
import { TabPanel } from './tab-panel';
import { TabProvider } from './tab-context';
import { useRect } from '../../lib/use-rect';
import { makeClassName } from '../../lib/make-class-name';

export type TabProps = ExtractProps<typeof TabGroup> & {
  hideHoverAnimation?: boolean;
};

export function Tab({
  vertical,
  className,
  selectedIndex,
  onChange,
  hideHoverAnimation,
  children,
  ...props
}: TabProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { rect, setRect } = useRect();
  const [activeTab, setActiveTab] = useState(0);
  const [displayHighlight, setDisplayHighlight] = useState(false);

  return (
    <TabProvider
      value={{
        ref,
        rect,
        setRect,
        vertical,
        displayHighlight,
        setDisplayHighlight,
        activeTab: selectedIndex ?? activeTab,
        hideHoverAnimation,
      }}
    >
      <TabGroup
        as="div"
        selectedIndex={selectedIndex ?? activeTab}
        onChange={onChange ?? setActiveTab}
        className={cn(makeClassName(`tab-root`), 'w-full', className, {
          'flex gap-4': vertical,
        })}
        {...props}
      >
        {React.Children.map(children as ReactNode, (child) => {
          if (React.isValidElement(child) && child.type === TabList) {
            return child;
          }
          if (React.isValidElement(child) && child.type === TabPanels) {
            return child;
          }
          return null;
        })}
      </TabGroup>
    </TabProvider>
  );
}

Tab.List = TabList;
Tab.ListItem = TabListItem;
Tab.Panels = TabPanels;
Tab.Panel = TabPanel;

Tab.displayName = 'Tab';
