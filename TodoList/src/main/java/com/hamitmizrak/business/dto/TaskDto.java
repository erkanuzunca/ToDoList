package com.hamitmizrak.business.dto;

import com.hamitmizrak.auditing.AuditingAwareBaseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import java.util.Date;
import java.io.Serializable;

// LOMBOK
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Log4j2
// Validation
public class TaskDto extends AuditingAwareBaseDto implements Serializable {

    // serileştirme
    public static final Long serialVersionUID=1L;

    private Long taskId;
    private String taskName;
    private boolean taskCompleted;
    //private Date taskDate=new Date(System.currentTimeMillis());



} //end class

