import { TabPanel as Tp } from '@headlessui/react';
import { cn } from '../../lib/cn';
import { ExtractProps } from '../../lib/extract-props';
import { makeClassName } from '../../lib/make-class-name';

export type TabPanelProps = ExtractProps<typeof Tp>;

export function TabPanel({ children, className, ...props }: TabPanelProps) {
  return (
    <Tp
      className={cn(makeClassName(`tab-panel`), className)}
      {...props}
    >
      {children}
    </Tp>
  );
}

TabPanel.displayName = 'TabPanel';
