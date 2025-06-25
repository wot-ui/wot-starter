// Import the core alova instance
import alovaInstance from './core/instance'

// Export the global Apis object from the generated code
import { createApis, withConfigType } from './createApis'

// Export the alova instance for direct use if needed
export { alovaInstance }

// Configure method options for specific APIs
export const $$userConfigMap = withConfigType({
  // Example: Configure caching and transformation for specific APIs
  // 'general.infoUsingPOST': {
  //   // Transform the response
  //   transform: (data: any) => data?.member || data,
  // },
})

// Create the global Apis object
const Apis = createApis(alovaInstance, $$userConfigMap)

// Export default Apis for global usage
export default Apis
