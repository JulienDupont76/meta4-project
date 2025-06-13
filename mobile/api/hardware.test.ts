import fetchFirebaseHardware from './hardware';

global.fetch = jest.fn();

const mockValidData = {
  busy_score: 1.5671666666666666,
  confidence_level: 'medium',
  current_distance: 20,
  current_people: 0,
  detection_active: true,
  predicted_wait_formatted: '0 minutes',
  predicted_wait_seconds: 0,
  queue_intensity: 1,
  sensor_occupied: true,
  timestamp: '2025-06-08T03:53:26.377762',
};

describe('fetchFirebaseHardware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and returns valid data', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockValidData,
    });

    const data = await fetchFirebaseHardware();

    expect(data).toEqual(expect.objectContaining(mockValidData));
  });

  it('throws error when response is not ok', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchFirebaseHardware()).rejects.toThrow('Network response was not ok');
  });

  it('throws error when data fails schema validation', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ invalid: 'data' }),
    });

    await expect(fetchFirebaseHardware()).rejects.toThrow('Invalid hardware data from Firebase');
  });
});
