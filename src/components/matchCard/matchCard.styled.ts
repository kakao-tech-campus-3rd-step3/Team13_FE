import styled from '@emotion/styled';
import { MdAccessTime, MdPeople, MdLocationOn } from 'react-icons/md';

import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export const CardContainer = styled.div`
  background: ${colors.background.default};
  border-radius: 12px;
  padding: ${spacing.spacing4};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing3};
  width: 100%;
  max-width: 400px;
  cursor: pointer;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  gap: ${spacing.spacing3};
  align-items: flex-start;
`;

export const CardImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
`;

export const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing1};
`;

export const CardTitle = styled.h3`
  font-size: ${typography.title2Bold.fontSize};
  font-weight: ${typography.title2Bold.fontWeight};
  line-height: ${typography.title2Bold.lineHeight};
  color: ${colors.text.default};
  margin: 0;
`;

export const CardTime = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.spacing1};
  color: ${colors.text.sub};
  font-size: ${typography.body2Regular.fontSize};
  font-weight: ${typography.body2Regular.fontWeight};
  line-height: ${typography.body2Regular.lineHeight};
`;

export const TimeIcon = styled(MdAccessTime)`
  color: ${colors.red[700]};
  font-size: 14px;
`;

export const PeopleInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${spacing.spacing2};
`;

export const PeopleCount = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.spacing1};
  color: ${colors.text.default};
  font-size: ${typography.body2Regular.fontSize};
  font-weight: ${typography.body2Regular.fontWeight};
`;

export const PeopleIcon = styled(MdPeople)`
  color: ${colors.yellow[600]};
  font-size: 14px;
`;

export const Deadline = styled.div`
  color: ${colors.text.default};
  font-size: ${typography.body2Regular.fontSize};
  font-weight: ${typography.body2Bold.fontWeight};
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: ${spacing.spacing2};
  margin-top: ${spacing.spacing2};
`;

export const ActionButton = styled.button<{
  variant?: 'primary' | 'secondary';
}>`
  flex: 1;
  padding: ${spacing.spacing2} ${spacing.spacing4};
  border-radius: 20px;
  border: none;
  font-size: ${typography.body2Regular.fontSize};
  font-weight: ${typography.body2Bold.fontWeight};
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ variant = 'primary' }) =>
    variant === 'primary'
      ? `
    background: ${colors.brand.kakaoYellow};
    color: ${colors.text.default};
    
    &:hover {
      background: ${colors.brand.kakaoYellowHover};
    }
    
    &:active {
      background: ${colors.brand.kakaoYellowActive};
    }
  `
      : `
    background: ${colors.background.default};
    color: ${colors.red[700]};
    border: 1px solid ${colors.red[500]};
    
    &:hover {
      background: ${colors.red[100]};
    }
    
    &:active {
      background: ${colors.red[200]};
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ResultButton = styled.button`
  width: 100%;
  padding: ${spacing.spacing2} ${spacing.spacing4};
  border-radius: 20px;
  border: 1px solid ${colors.blue[700]};
  background: ${colors.background.default};
  color: ${colors.blue[700]};
  font-size: ${typography.body2Regular.fontSize};
  font-weight: ${typography.body2Bold.fontWeight};
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: ${spacing.spacing2};

  &:hover {
    background: ${colors.blue[100]};
  }

  &:active {
    background: ${colors.blue[200]};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const NoImagePlaceholder = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background: ${colors.gray[200]};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${colors.gray[500]};
  font-size: 24px;
`;

export const LocationIcon = styled(MdLocationOn)`
  width: 24px;
  height: 24px;
  color: ${colors.gray[500]};
`;
