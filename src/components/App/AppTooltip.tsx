import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

const TooltipDemo = ({
  children,
  content
}: {
  children: any;
  content: any;
}) => {
  return (
    <Tooltip.Provider delayDuration={200} skipDelayDuration={100}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          {children}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="TooltipContent" sideOffset={5}>
            { content }
            <Tooltip.Arrow className="TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default TooltipDemo;