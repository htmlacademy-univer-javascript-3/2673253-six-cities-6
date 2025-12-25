import {redirect} from './redirect.ts';
import browserHistory from '../../utils/browser-history.ts';

vi.mock('../../utils/browser-history.ts', () => ({
  __esModule: true,
  default: {push: vi.fn()},
}));

describe('Middleware: redirect', () => {
  const next = vi.fn();
  const invoke = (action: {type: string; payload?: string}) => {
    redirect({dispatch: vi.fn(), getState: vi.fn()} as never)(next)(action as never);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should push to history when action is redirectToRoute', () => {
    const action = {type: 'global/redirectToRoute', payload: '/login'};

    invoke(action);

    expect(browserHistory.push).toHaveBeenCalledWith('/login');
    expect(next).toHaveBeenCalledWith(action);
  });

  it('should not push for other actions', () => {
    invoke({type: 'unknown', payload: '/some'});

    expect(browserHistory.push).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith({type: 'unknown', payload: '/some'});
  });
});
