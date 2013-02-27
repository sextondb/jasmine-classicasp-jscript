<a name="README"></a>
**Jasmine-ClassicAsp-JScript**

**A server-side JScript testing framework forked from [Jasmine](http://pivotal.github.com/jasmine/)**

Jasmine-ClassicAsp-JScript is focused on providing testability for server-side JScript under "Classic ASP"

## Notable changes

* Removes all support for asynchronous operations
* Removes references to the global "this" object
* Focuses on removing dead code that will never be used in server-side JScript
* Focuses on iterative rather than recursive execution.
 * there is no equivalent of setTimeout(next_, 0), so recursive execution will exhaust the stack quickly


## Maintainers

* [David Sexton](mailto:code@dbsexton.com)

Copyright (c) 2013 David Sexton. This software is licensed under the MIT license.

Jasmine is Copyright (c) 2008-2012 Pivotal Labs.