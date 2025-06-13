import React from 'react';
import Pins from './Pins';
import { renderWithProviders } from '@/utils/test-utils';

describe('Pins component', () => {
  const baseProps = {
    coordinate: { latitude: 37.77, longitude: -122.42 },
    name: 'Kaimaru',
    type: 'library' as const,
    onPress: jest.fn(),
    selected: false,
  };

  it('renders facility name', async () => {
    const { getByText } = await renderWithProviders(<Pins {...baseProps} />);
    expect(getByText('Kaimaru')).toBeTruthy();
  });

  it('displays correct background color for facility type', async () => {
    const { getByTestId } = await renderWithProviders(<Pins {...baseProps} />);
    const iconWrapper = getByTestId('icon-background');
    expect(iconWrapper.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: '#FFB503' }), // library color
      ]),
    );
  });

  it('changes pin background to gray when selected', async () => {
    const { getByTestId } = await renderWithProviders(<Pins {...baseProps} selected={true} />);
    const pinBackground = getByTestId('pin-background');
    expect(pinBackground.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ backgroundColor: 'gray' })]),
    );
  });

  it('uses default white pin background when not selected', async () => {
    const { getByTestId } = await renderWithProviders(<Pins {...baseProps} />);
    const pinBackground = getByTestId('pin-background');
    expect(pinBackground.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ backgroundColor: 'white' })]),
    );
  });
});
