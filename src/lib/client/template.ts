import type { CV, CvJob, CvOtherItem, CvSchool } from "$lib/types/types";

let renderCount = 0;

export function parseTemplate (data: CV) {
    renderCount++;
    return renderTemplate(data);
};

function renderTemplate (data: CV) {
    return `
        ${renderLayout()}
        #align(
            center, 
            par(leading: 0pt, text(_fontSize * 2)[
                ${data.name}
            ])
        )
        #v(_spacing)
        #align(
            center, 
            text[
                ${renderLinks(data)}
            ]
        )
        #v(_spacing * 3)
        ${renderEducationSection(data)}
        ${renderExperienceSection(data)}
        ${renderSkillSection(data)}
        ${renderOtherSection(data)}
    `; 
}

function renderSectionHeader (heading: string) {
    return `
        #grid(
            columns: (auto, 1fr),
            [= ${heading}], 
            gutter: 1em,
            align(
                horizon,
                line(length: 100%)
            ) 
        )
    `;
}

function renderLinks (data: CV) {
    let i = 0; 
    let res = ''; 
    for(const link of data.links) {
        res += `#link("${link.url}")[${link.label.replace('@', '\\@')}]`; 
        if(i < data.links.length - 1) {
            res += ' · '; 
        }
        i++; 
    }
    return res; 
}

function renderEducationSection(data: CV) {
    if(data.education.schools.length === 0) return ''; 

    let items = '';
    for(const item of data.education.schools) {
        items += `
            #v(_spacing)
            ${renderEducationItem(item)}
        `;
    }
    return `
        ${renderSectionHeader(data.education.heading)}
        ${items}
    `; 
}

function renderEducationItem (item: CvSchool) {
    return `
        #grid(
            columns: (1fr, auto),
            align(left)[
                == ${item.name} \\
                ${item.description}
            ],
            align(right)[
                ${item.place} \\
                ${item.start} - ${item.end} \\
            ]
        )
    `; 
}

function renderExperienceSection(data: CV) {
    if(data.experience.jobs.length === 0) return ''; 

    let items = '';
    for(const item of data.experience.jobs) {
        items += `
            ${renderJobItem(item)}
        `;
    }
    return `
        #v(_spacing * 2)
        ${renderSectionHeader(data.experience.heading)}
        #v(_spacing)
        ${items}
    `; 
}

function renderJobItem (item: CvJob) {
    const positions = item.positions.map((position) => {
        const bullets = position.bulletPoints.map((bullet) => {
            return `- ${bullet} \n `; 
        }).join(' ');

        return `
            #grid(
                columns: (1fr, auto),
                align(left)[
                    === ${position.title}
                ],
                align(right)[
                    ${position.start} - ${position.end}
                ]
            )
            #v(_spacing / 2)
            #text[${bullets}]
            #v(_spacing)
        `; 
    }).join(' '); 


    return `
        #grid(
            columns: (1fr, auto),
            align(left)[
                == ${item.company} 
            ],
            align(right)[
                ${item.place} 
            ]
        )
        #v(_spacing / 2)
        ${positions}
        #v(_spacing)
    `; 
}

function renderSkillSection(data: CV) {
    if(data.skills.categories.length === 0) return ''; 

    let items: string[] = [];
    for(const item of data.skills.categories) {
        items.push(`[${item.label}:], [${item.items.join(', ')}]`);
    }
    return `
        #v(_spacing * 2)
        ${renderSectionHeader(data.skills.heading)}
        ${data.skills.categories.length > 0 ? '#v(_spacing)' : ''}
        #grid(
            columns: (auto, 1fr),
            row-gutter: _spacing,
            column-gutter: _spacing * 2,
            ${items.join(', ')}
        )
    `; 
}

function renderOtherSection(data: CV) {
    if(data.other.items.length === 0) return ''; 

    let items = '';
    for(const item of data.other.items) {
        items += `
            #v(_spacing)
            ${renderOtherItem(item)}
        `;
    }
    return `
        #v(_spacing * 2)
        ${renderSectionHeader(data.other.heading)}
        ${items}
    `; 
}

function renderOtherItem (item: CvOtherItem) {
    return `
        #grid(
            columns: (1fr, auto),
            align(left)[
                == ${item.name}
            ],
            align(right)[
                ${item.place} - ${item.date}
            ]
        )
        #text[${item.description}]
    `; 
}

function renderLayout () {
    return `
        #set page(
            paper: "a4",
            margin: 2cm,
            number-align: right
        )

        #let _spacing = 5pt
        #let _fontSize = 11pt

        #set text(
            font: "Linux Libertine",
            size: _fontSize,
        )

        #set par(leading: _spacing)
        #set block(spacing: _spacing)

        #show heading.where(
            level: 1
        ): it => [
            #set text(14pt, weight: "regular", style: "italic")
            #text[#it.body]
        ]

        #show heading.where(
            level: 2
        ): it => [
            #set text(12pt, weight: "bold")
            #text[#it.body]
        ]

        #show heading.where(
            level: 3
        ): it => [
            #set text(12pt, weight: "regular", style: "italic")
            #text[#it.body]
        ]
    `; 
}