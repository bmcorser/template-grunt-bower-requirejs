Getting started
---------------
To set the project up for development, you need to `install Node.js`_ (whatever
the trendy way to do that is this week) and two CLI tools which assist with
build and dependency resolution. You can install both from NPM::

    sudo npm install -g grunt
    sudo npm install -g bower

From the root (in the same directory as ``bower.json`` and ``package.json``)
to download Grunt deps and project deps run::

    npm install
    bower install

In the same directory, the project can be built with::

    grunt build

During development, Grunt can be used to watch for source changes and re-build
when something does::

    grunt watch

.. _`install Node.js`: http://nodejs.org/


Project structure
-----------------

Example tree
^^^^^^^^^^^^

The directory tree for a skeleton project::

    ├── Gruntfile.js
    ├── README.rst
    ├── app
    │   ├── js
    │   │   ├── init.js
    │   │   ├── config.js
    │   │   └── require.js
    │   ├── templates
    │   │   └── index.html
    │   └── css
    │       └── main.css
    ├── bower.json
    └── package.json


Project configuration
^^^^^^^^^^^^^^^^^^^^^

Grunt
~~~~~
Most of the project configuration is related to the build process which is
defined in ``Gruntfile.js``. Here the expected paths of templates, stylesheets
and JS modules are configured alongside the transformations (minification,
template build, etc.) to be performed on files along those paths.


RequireJS
~~~~~~~~~
Listed as ``config.js`` in the example tree given above.

This file is partly managed by the ``bower`` task, which runs
`grunt-bower-requirejs`_, and holds the configuration of RequireJS modules
(both vendor and in-house). Vendor libraries are added to this file
automatically when ``bower`` task is invoked, but in-house modules must be
added "by hand". The syntax of this file at its most simple is a key-value
mapping of module name to path, like this:

.. code:: javascript

    requirejs.config({
      paths: {
        underscore: "lib/underscore/underscore",
        init: "init"
      },
    });

.. _`grunt-bower-requirejs`: https://github.com/yeoman/grunt-bower-requirejs


Entry point
~~~~~~~~~~~
Listed as ``init.js`` in the example tree given above.

The entry point for the JS app is where code execution and AMD loading begins.
The ``require`` call for the entry point module must be made after the
RequireJS configuration is loaded (see above). Example markup for how this can
be done is provided below. This would appear in ``index.html`` in the above
example.

.. code:: html

    <head>
     <script src="js/require.js"></script>
     <script>
       require(['js/config'], function(config){
         require(['init']);
       });
     </script>
    </head>


Bower
~~~~~
Application dependencies are defined in ``bower.json``, this file is managed by
Bower when using the ``--save`` flag like this:

.. code:: bash

    bower install underscore --save    # an entry for underscore is added
    bower uninstall underscore --save  # the above entry is removed



NPM
~~~
Build dependencies are defined in ``package.json`` which is similarly managed
by the NPM command-line tool when using the ``--save-dev`` flag.
