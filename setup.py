from setuptools import setup

setup(
    name='clientesba',
    packages=['clientesba'],
    include_package_data=True,
    install_requires=[
        'flask','watchdog'
    ],
)