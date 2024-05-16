import React from 'react';
import { TabPanels as Tps } from '@headlessui/react';
import { cn } from '../../lib/cn';
import { ExtractProps } from '../../lib/extract-props';
import { TabPanel } from './tab-panel';
import { useTab } from './tab-context';
import { makeClassName } from '../../lib/make-class-name';

const tabPanelsStyles = {
  base: 'py-2',
  vertical: '',
  horizontal: 'mt-2',
};

export type TabPanelsProps = ExtractProps<typeof Tps> & {};

export function TabPanels({ children, className, ...props }: TabPanelsProps) {
  const { vertical } = useTab();

  return (
    <Tps
      className={cn(
        makeClassName(`tab-panels`),
        tabPanelsStyles.base,
        vertical ? tabPanelsStyles.vertical : tabPanelsStyles.horizontal,
        className
      )}
      {...props}
    >
      {React.Children.map(children as any, (child) => {
        if (React.isValidElement(child) && child.type === TabPanel) {
          return child;
        }
        return null;
      })}
    </Tps>
  );
}

TabPanels.displayName = 'TabPanels';
