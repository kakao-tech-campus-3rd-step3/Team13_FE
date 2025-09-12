import { useState } from 'react';

import * as S from './NavigationTab.styled.ts';

export interface TabItem {
  label: string;
  content: React.ReactNode;
}

interface NavigationTabProps {
  tabs: TabItem[];
}

const NavigationTab = ({ tabs }: NavigationTabProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <S.TabList role="tablist">
        {tabs.map((tab, index) => (
          <S.TabButton
            key={tab.label}
            role="tab"
            active={activeIndex === index}
            aria-selected={activeIndex === index}
            onClick={() => setActiveIndex(index)}
          >
            {tab.label}
          </S.TabButton>
        ))}
      </S.TabList>
      <S.TabPanel role="tabpanel">{tabs[activeIndex]?.content}</S.TabPanel>
    </div>
  );
};

export default NavigationTab;
