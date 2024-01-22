export class Jobs {

    filter = [];

    constructor(jobs) {
        this.jobs = jobs;
    }

    createJobsList() {
        this.generateJobsList();
        document.querySelector('.clear-button-container button').addEventListener('click', () => {
            this.clearFilter();
        });
        window.addEventListener('resize', () => {
            this.addHeaderMarginBottom();
        });
    }

    generateJobsList() {
        const jobsList = (this.filter.length) ? this.filterJobsList() : this.jobs;
        document.querySelector('main').innerHTML = '';
        jobsList.forEach(job => {
            const template = `  <div class="mobile-logo-container d-sm-none">
                                    <img src="${job.logo}" alt="${job.company} logo" class="img-fluid" />
                                </div>
                                <div class="row rounded">                                
                                    <div class="col-12 first-child">
                                        <div class="row">
                                            <div class="col-12 col-sm-8 col-md-7 pb-4 p-0 pb-sm-0 p-sm-0 mb-4 mb-sm-0">
                                                <div class="row">
                                                    <div class="col-12 d-sm-flex gap-sm-4">                                
                                                        <div class="p-0 d-none d-sm-block">
                                                            <img src="${job.logo}" alt="${job.company} logo" class="img-fluid" />
                                                        </div>
                                                        <div class="d-flex flex-column justify-content-between gap-2 gap-sm-0 p-0">
                                                            <div class="d-flex gap-3">
                                                                <strong>${job.company}</strong>
                                                                <div class="badge-container d-flex align-items-center gap-2">
                                                                </div>
                                                            </div>
                                                            <h1 class="h5 m-0"><a href="#" class="fw-bold">${job.position}</a></h1>
                                                            <div class="d-flex gap-2 gap-sm-3">
                                                                <span>${job.postedAt}</span>
                                                                <span class="dot">.</span>
                                                                <span>${job.contract}</span>
                                                                <span class="dot">.</span>
                                                                <span>${job.location}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 col-sm-4 col-md-5 p-0 d-flex justify-content-start justify-content-sm-end align-items-center">
                                                <ul class="list-unstyled d-flex flex-wrap justify-content-start justify-content-sm-end m-0 gap-3">
                                                </ul>
                                            </div>
                                        </div>                                
                                    </div>
                                </div>
                            `;
            const jobContainer = document.createElement('div');
            jobContainer.innerHTML = template;
            if(job.new)
                jobContainer.querySelector('.badge-container').innerHTML += `<span class="badge new-badge rounded-pill">NEW!</span>`;

            if(job.featured) {
                jobContainer.querySelector('.badge-container').innerHTML += `<span class="badge featured-badge rounded-pill">FEATURED</span>`;
                jobContainer.querySelector('.first-child').classList.add('featured-border');
            } else {
                jobContainer.querySelector('.first-child').classList.add('non-featured-border');
            }

            if(job.role) {
                const li = document.createElement('li');
                li.innerHTML = `<button type="button" class="btn btn-primary py-1 px-2 fw-bold">${job.role}</button>`;
                li.querySelector('button').addEventListener('click', () => {
                    this.addFilterItem(job.role);
                });
                jobContainer.querySelector('ul').appendChild(li);
            }

            if(job.level) {
                const li = document.createElement('li');
                li.innerHTML = `<button type="button" class="btn btn-primary py-1 px-2 fw-bold">${job.level}</button>`;
                li.querySelector('button').addEventListener('click', () => {
                    this.addFilterItem(job.level);
                });
                jobContainer.querySelector('ul').appendChild(li);
            }

            job.languages.forEach(language => {
                const li = document.createElement('li');
                li.innerHTML = `<button type="button" class="btn btn-primary py-1 px-2 fw-bold">${language}</button>`;
                li.querySelector('button').addEventListener('click', () => {
                    this.addFilterItem(language);
                });
                jobContainer.querySelector('ul').appendChild(li);
            });
            job.tools.forEach(tool => {
                const li = document.createElement('li');
                li.innerHTML = `<button type="button" class="btn btn-primary py-1 px-2 fw-bold">${tool}</button>`;
                li.querySelector('button').addEventListener('click', () => {
                    this.addFilterItem(tool);
                });
                jobContainer.querySelector('ul').appendChild(li);
            });

            document.querySelector('main').appendChild(jobContainer);
        });
    }

    addFilterItem(filterItem) {
        if(!this.filter.includes(filterItem)) {
            this.filter.push(filterItem);
            this.generateFilterEl();
            this.toggleFilterElDisplayNone();
            this.generateJobsList();
        }
    }

    generateFilterEl() {
        const filterContainer = document.querySelector('.filter-container > div');
        const filtersContainer = filterContainer.querySelector('div:first-of-type');
        filtersContainer.innerHTML = '';
        this.filter.forEach((item, index) => {
            const template = `
                                <span class="d-block py-1 px-2 fw-bold rounded-start">${item}</span>
                                <button type="button" class="rounded-end px-2"><img src="./images/icon-remove.svg" alt="Remove icon" /></button>
                            `;
            const filterItem = document.createElement('div');
            filterItem.classList.add('d-flex');
            filterItem.innerHTML = template;
            const jobs = this;
            filterItem.querySelector('button').addEventListener('click', function() {
                jobs.filter.splice(index, 1);
                jobs.generateFilterEl();
                jobs.generateJobsList();

            });
            
            filtersContainer.appendChild(filterItem);
        });
        this.toggleFilterElDisplayNone();
        this.addHeaderMarginBottom();
    }

    toggleFilterElDisplayNone() {
        if(this.filter.length) {
            if(document.querySelector('.filter-container').classList.contains('d-none'))
                document.querySelector('.filter-container').classList.remove('d-none');
        } else {
            if(!document.querySelector('.filter-container').classList.contains('d-none'))
                document.querySelector('.filter-container').classList.add('d-none');
        }
    }

    filterJobsList() {
        return this.jobs.filter(job => {
            return this.filter.every(item => {
                if((job.role === item) || (job.level === item) || job.languages.includes(item) || job.tools.includes(item))
                    return true;

                return false;
            });
        });
    }

    clearFilter() {
        this.filter = [];
        this.generateFilterEl();
        this.toggleFilterElDisplayNone();
        this.generateJobsList();
    }

    addHeaderMarginBottom() {
        const header = document.querySelector('header');
        const filterContainer = document.querySelector('.filter-container');
        if(!filterContainer.classList.contains('d-none')) {
            const headerMarginBottom = `${filterContainer.getBoundingClientRect().height / 2}px`;
            header.style.marginBottom = headerMarginBottom;
        } else {
            header.style.marginBottom = 0;
        }
    }
}