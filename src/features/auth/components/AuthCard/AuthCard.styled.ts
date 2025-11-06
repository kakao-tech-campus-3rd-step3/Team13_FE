import styled from '@emotion/styled';

import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';

export const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: grid;
  place-items: center;
  padding: ${spacing.spacing6} ${spacing.spacing4};
  background: linear-gradient(
    160deg,
    ${colors.gray[100]} 0%,
    ${colors.gray[0]} 40%,
    ${colors.gray[100]} 100%
  );
`;

export const Card = styled.section`
  width: 100%;
  max-width: 420px;
  border-radius: 28px;
  padding: ${spacing.spacing6} ${spacing.spacing5};
  background-color: ${colors.gray[0]};
  box-shadow: 0 24px 64px rgba(15, 23, 42, 0.16);
`;
