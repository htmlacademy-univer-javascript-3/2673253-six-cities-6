import {describe, expect, it} from 'vitest';
import {SortingOption} from '../../const.ts';
import {makeFakeCity} from '../../mocks/mock-data.ts';
import {makeFakeSettingsProcessState} from '../../mocks/mock-state.ts';
import {changeCity, changeSorting, settingsProcess} from './settings-process.ts';

describe('settingsProcess reducer', () => {
  it('should return initial state with unknown action', () => {
    const defaultState = makeFakeSettingsProcessState();
    const result = settingsProcess.reducer(undefined, {type: 'unknown'});

    expect(result).toEqual(defaultState);
  });

  it('should change city with changeCity action', () => {
    const defaultState = makeFakeSettingsProcessState();
    const state = settingsProcess.reducer(
      defaultState,
      changeCity(makeFakeCity('Amsterdam'))
    );

    expect(state.city.name).toBe('Amsterdam');
  });

  it('should change sorting with changeSorting action', () => {
    const defaultState = makeFakeSettingsProcessState();
    const state = settingsProcess.reducer(
      defaultState,
      changeSorting(SortingOption.TopRatedFirst)
    );

    expect(state.sorting).toBe(SortingOption.TopRatedFirst);
  });
});
