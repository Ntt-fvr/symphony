#!/usr/bin/env python3

import codecs
import os
import re

import setuptools


def read(*parts):
    with codecs.open(os.path.join(*parts), "r") as fp:
        return fp.read()


def find_version(*file_paths):
    version_file = read(*file_paths)
    version_match = re.search(r"^__version__ = ['\"]([^'\"]*)['\"]", version_file, re.M)
    if version_match:
        return version_match.group(1)
    raise RuntimeError("Unable to find version string.")


GQL_PACKAGES = ["gql", "gql.*"]
PSYM_PACKAGES = ["psym", "psym.*"]


setuptools.setup(
    name="psym",
    version=find_version("psym", "common", "constant.py"),
    author="Facebook Inc.",
    description="Tool for accessing and modifying Symphony database",
    packages=setuptools.find_packages(include=GQL_PACKAGES + PSYM_PACKAGES),
    classifiers=["Programming Language :: Python :: 3.6"],
    include_package_data=True,
    install_requires=[
        "graphql-core-next>=1.0.0",
        "tqdm>=4.32.2",
        "rx==1.6.1",
        "unicodecsv>=0.14.1",
        "requests>=2.22.0",
        "filetype>=1.0.5",
        "jsonschema",
        "pandas>=0.24.2",
        "xlsxwriter>=1.1.8",
        "xlrd>=1.2.0",
        "dataclasses==0.6",
        "dataclasses-json==0.3.2",
        "dacite>=1.0.2",
        "sphinx>=3.1.2",
        "sphinxcontrib-napoleon",
        "colorama>=0.4.1",
        "unittest-xml-reporting>=2.5.2",
        "grpcio>=1.27.2",
        "grpcio-tools>=1.27.2",
        "websocket-client>=0.56.0",
        "mypy",
        "black",
        "flake8",
    ],
)
