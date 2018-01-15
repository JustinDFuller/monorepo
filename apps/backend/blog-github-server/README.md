# blog-github-server

[![Build Status](https://travis-ci.org/JustinDFuller/blog-github-server.svg?branch=master)](https://travis-ci.org/JustinDFuller/blog-github-server)
[![Coverage Status](https://coveralls.io/repos/github/JustinDFuller/blog-github-server/badge.svg?branch=master)](https://coveralls.io/github/JustinDFuller/blog-github-server?branch=master)

Micro service used to get Github info for my interactive résumé.

## Routes

#### /repos

This will fetch a list of all the repos I have. They will be ordered by most recently updated.

#### /repos/bylanguage?language=whatever

This will fetch all the repos that use language "whatever".
