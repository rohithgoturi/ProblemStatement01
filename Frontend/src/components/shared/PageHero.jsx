/**
 * PageHero — Alias for PageHeader to maintain backwards compatibility
 * across all existing imports while enforcing the global canonical design system.
 */
import { PageHeader } from './PageHeader';

export { PageHeader };
export const PageHero = PageHeader;
export default PageHeader;
