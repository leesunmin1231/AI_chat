import { css } from '@emotion/react';
import { FONT } from './font';

export const title = css`
  font-size: ${FONT.title.size};
  font-weight: ${FONT.title.weight};
  color: ${FONT.title.color};
`;

export const subtitle = css`
  font-size: ${FONT.subtitle.size};
  font-weight: ${FONT.subtitle.weight};
  color: ${FONT.subtitle.color};
`;

export const body = css`
  font-size: ${FONT.body.size};
  font-weight: ${FONT.body.weight};
  color: ${FONT.body.color};
`;

export const description = css`
  font-size: ${FONT.description.size};
  font-weight: ${FONT.description.weight};
  color: ${FONT.description.color};
`;
