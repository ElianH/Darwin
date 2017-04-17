To Fix react-native's Strict mode error (red screen):

Change file:
D:\src\Darwin\node_modules\react-native\Libraries\Utilities\UIManager.js

Line 68:
function normalizePrefix(moduleName: string): string {
to
var normalizePrefix = function (moduleName: string): string {





