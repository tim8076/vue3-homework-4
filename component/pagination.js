
export default{
    props: {
        page:{
            type: Object,
            required: true
        }
    },
    emits: ['changePage'],
    template: 
    `<nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item" :class="{ disabled : !page.has_pre }">
                <a class="page-link" href="#" aria-label="Previous"
                   @click.prevent="$emit('changePage',page.current_page - 1 )">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item" 
                :class="{ active : num === page.current_page }"
                v-for="num in page.total_pages" 
                :key="num">
                <a href="#"
                   class="page-link"  
                   @click.prevent="$emit('changePage',num)">{{ num }}
                </a>
            </li>
            <li class="page-item" 
                :class="{ disabled : !page.has_next }">
                <a class="page-link" href="#" aria-label="Next"
                   @click.prevent="$emit('changePage',page.current_page + 1)">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>`
}
