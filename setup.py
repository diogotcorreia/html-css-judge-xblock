"""Setup for html/css judge XBlock."""

import os
from setuptools import setup


def package_data(pkg, roots):
    """Generic function to find package_data.

    All of the files under each of the `roots` will be declared as package
    data for package `pkg`.

    """
    data = []
    for root in roots:
        for dirname, _, files in os.walk(os.path.join(pkg, root)):
            for fname in files:
                data.append(os.path.relpath(os.path.join(dirname, fname), pkg))

    return {pkg: data}


setup(
    name='html-css-judge-xblock',
    version='1.0.1',
    description='An OpenEdx XBlock that evaluates HTML and CSS code',
    packages=[
        'htmlcssjudge',
    ],
    install_requires=['XBlock', 'epicbox', 'xblock-utils', 'edx-submissions'],
    dependency_links=[
        'git+https://github.com/StepicOrg/epicbox.git',
    ],
    entry_points={
        'xblock.v1': [
            'htmlcssjudge = htmlcssjudge:HtmlCssJudgeXBlock',
        ]
    },
    package_data=package_data("htmlcssjudge", ["static", "templates"]),
)
