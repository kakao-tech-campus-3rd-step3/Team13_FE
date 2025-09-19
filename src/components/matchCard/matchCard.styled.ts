import styled from '@emotion/styled';
import { MdAccessTime, MdPeople, MdLocationOn } from 'react-icons/md';

import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export const CardContainer = styled.div`
  background: ${colors.background.default};
  border-radius: 12px;
  /* TODO: 화면 비율에 맞는 값으로 수정 필요 (현재 고정값: 440px * 80px) */
  width: 440px;
  height: 80px;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const CardHeader = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const CardImage = styled.img`
  /* TODO: 화면 비율에 맞는 값으로 수정 필요 (현재 고정값: 60px * 60px) */
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  position: absolute;
  /* TODO: 화면 비율에 맞는 값으로 수정 필요 (현재 고정값: left 10px, top 10px) */
  left: 10px;
  top: 10px;
`;

export const CardContent = styled.div`
  position: absolute;
  /* TODO: 화면 비율에 맞는 값으로 수정 필요 (현재 고정값: left 82px, top 17px) */
  left: 82px;
  top: 17px;
  width: calc(100% - 92px);
  height: calc(100% - 34px);
`;

export const CardTitle = styled.h3`
  /* TODO: 화면 비율에 맞는 값으로 수정 필요 (현재 고정값: font-size 12px) */
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  color: ${colors.text.default};
  margin: 0;
  font-family: 'Inter-Regular', sans-serif;
  position: absolute;
  top: 0;
  left: 0;
  /* TODO: 화면 비율에 맞는 값으로 수정 필요 (현재 고정값: width 194px, height 15px) */
  width: 194px;
  height: 15px;
`;

export const CardTime = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${colors.text.default};
  /* TODO: 화면 비율에 맞는 값으로 수정 필요 (현재 고정값: font-size 12px) */
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  font-family: 'Inter-Regular', sans-serif;
  position: absolute;
  /* TODO: 화면 비율에 맞는 값으로 수정 필요 (현재 고정값: top 23px) */
  top: 23px;
  left: 0;
  /* TODO: 화면 비율에 맞는 값으로 수정 필요 (현재 고정값: width 194px, height 15px) */
  width: 194px;
  height: 15px;
`;

export const TimeIcon = styled(MdAccessTime)`
  color: ${colors.red[700]};
  /* TODO: 화면 비율에 맞는 값으로 수정 필요 (현재 고정값: font-size 14px) */
  font-size: 14px;
  margin-right: 2px;
`;

export const PeopleInfo = styled.div`
  position: absolute;
  /* TODO: 화면 비율에 맞는 값으로 수정 필요 (현재 고정값: right 10px) */
  right: 10px;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`;

export const PeopleCount = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${colors.text.default};
  /* TODO: 화면 비율에 맞는 값으로 수정 필요 (현재 고정값: font-size 12px) */
  font-size: 12px;
  font-weight: 400;
  font-family: 'Inter-Regular', sans-serif;
  text-align: right;
  /* TODO: 화면 비율에 맞는 값으로 수정 필요 (현재 고정값: width 86px, height 15px) */
  width: 86px;
  height: 15px;
`;

export const PeopleIcon = styled(MdPeople)`
  color: ${colors.yellow[600]};
  /* TODO: 화면 비율에 맞는 값으로 수정 필요 (현재 고정값: font-size 14px) */
  font-size: 14px;
`;

export const Deadline = styled.div`
  color: ${colors.text.default};
  /* TODO: 화면 비율에 맞는 값으로 수정 필요 (현재 고정값: font-size 12px) */
  font-size: 12px;
  font-weight: 400;
  font-family: 'Inter-Regular', sans-serif;
  text-align: right;
  /* TODO: 화면 비율에 맞는 값으로 수정 필요 (현재 고정값: width 138px, height 15px) */
  width: 138px;
  height: 15px;
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
  /* TODO: 화면 비율에 맞는 값으로 수정 필요 (현재 고정값: 60px * 60px) */
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background: ${colors.gray[200]};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  /* TODO: 화면 비율에 맞는 값으로 수정 필요 (현재 고정값: left 10px, top 10px) */
  left: 10px;
  top: 10px;
  color: ${colors.gray[500]};
`;

export const LocationIcon = styled(MdLocationOn)`
  /* TODO: 화면 비율에 맞는 값으로 수정 필요 (현재 고정값: width 24px, height 24px) */
  width: 24px;
  height: 24px;
  color: ${colors.gray[500]};
`;
